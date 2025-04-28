import {synchronize} from '@nozbe/watermelondb/sync';

/**
 * 1) GraphQL Query: Pull all changed safes since `since` timestamp
 *    (We fetch every field you'd like to sync. Below is the "full" example.)
 */
const PULL_STOCKS_GQL = `
query PullStocks($since: String!, $page: Int!, $limit: Int!) {
  pullStocks(since: $since, page: $page, limit: $limit) {
    id
    productId
    productDescription
    eanCode
    availableStock

    # Sync helpers
    deleted
    updated_at
  }
}
`;

const PULL_SAFES_GQL = `
query PullSafes($since: String!, $page: Int!, $limit: Int!) {
  pullSafes(since: $since, page: $page, limit: $limit) {
      id
      accessory1
      accessory2
      accessory3
      accessory4
      accessory5
      accessory6
      accessory7
      accessory8
      accessory9
      accessory10
      articleNumber
      burglaryClassificationEn
      burglaryClassificationFr
      burglaryClassificationNl
      cataloguspaginaFR
      cataloguspaginaNL
      categoryEn
      categoryFr
      categoryNl
      chapterEn
      chapterFr
      chapterNl
      descriptionEn
      descriptionFr
      descriptionNl
      divisie
      drawers
      eanCode
      eurosafeEuroGradeEn
      eurosafeEuroGradeFr
      eurosafeEuroGradeNl
      fireResistantClassificationEn
      fireResistantClassificationExplanationEn
      fireResistantClassificationExplanationFr
      fireResistantClassificationExplanationNl
      fireResistantClassificationFr
      fireResistantClassificationNl
      gerelateerdeArtikelen
      handleiding1
      handleiding2
      imageArray {
        blob
        filename
        hash
      }
      insideDimensionDepthInMm
      insideDimensionHightInMm
      insideDimensionWideInMm
      insuranceRatingFr
      insuranceRatingNl
      kluizenwijzer
      logo1Nl
      logo2Nl
      manual1
      manual2
      manuelDInstructions1
      manuelDInstructions2
      modelEn
      modelFr
      modelNl
      nameSeriesEn
      nameSeriesFr
      nameSeriesNl
      noBackgroundImage
      numberKeyHooks
      outsideDimensionDepthInMm
      outsideDimensionHightInMm
      outsideDimensionWideInMm
      owner_id
      picture1
      picture2
      picture3
      sessionId
      shelves
      shownOnUKWebsite
      timeStamp
      ukInsuranceRating
      volumeInLiters
      weapons
      weightInKg

      # Sync fields
      deleted
      updated_at
    }
  }
`;

/**
 * 2) Helper: Converts array of safes from server to WatermelonDB format:
 *    { created: [], updated: [], deleted: [] }
 *
 * When using the `sendCreatedAsUpdated` option, all new records should be sent as updated.
 *
 * We mark non-deleted safe records as "updated", and for each safe's child image records we:
 * - Ensure each image gets a unique id (here we use a combination of safe id and index).
 * - Place them in the updated array.
 */
function convertServerStocksToWatermelon(stocksArray) {
  const created = [];
  const updated = [];
  const deleted = [];

  stocksArray.forEach(doc => {
    // strip out any fields you don't store locally
    const record = {
      id: doc.id,
      productId: doc.productId,
      productDescription: doc.productDescription,
      eanCode: doc.eanCode,
      availableStock: doc.availableStock,
      updated_at: doc.updated_at,
      deleted: doc.deleted,
    };

    if (doc.deleted) {
      deleted.push(doc.id);
    } else {
      updated.push(record);
    }
  });

  return {
    stocks: {created, updated, deleted},
  };
}

/** 3) Main Sync Function: Only Pulls Stocks (No Push) */
export async function syncStocks(database) {
  console.log('[syncStocks] Starting sync...');
  try {
    await synchronize({
      database,
      sendCreatedAsUpdated: true,

      pullChanges: async ({lastPulledAt}) => {
        console.log('[PullStocks] lastPulledAt:', lastPulledAt);
        const sinceValue = lastPulledAt
          ? new Date(lastPulledAt).toISOString()
          : '1970-01-01T00:00:00.000Z';

        const limit = 25000;
        let currentPage = 0;
        let allStocks = [];
        let hasMore = true;

        while (hasMore) {
          const response = await fetch('http://34.32.33.187/graphql', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
              query: PULL_STOCKS_GQL,
              variables: {
                since: sinceValue,
                page: currentPage,
                limit,
              },
            }),
          });

          if (!response.ok) {
            throw new Error(`GraphQL pull error: ${response.statusText}`);
          }
          const {data, errors} = await response.json();
          if (errors) {
            throw new Error(`GraphQL errors: ${JSON.stringify(errors)}`);
          }

          const pageStocks = data.pullStocks || [];
          allStocks = allStocks.concat(pageStocks);
          hasMore = pageStocks.length === limit;
          currentPage++;
        }

        const stockChanges = convertServerStocksToWatermelon(allStocks);
        const timestamp = Date.now();

        return {changes: stockChanges, timestamp};
      },

      pushChanges: async () => {
        console.log('[syncStocks] pushChanges called - no-op.');
      },
    });

    console.log('[syncStocks] Sync completed.');
  } catch (err) {
    console.error('[syncStocks] Sync failed:', err);
    throw err;
  }
}

function convertServerSafesToWatermelon(safesArray) {
  const safeCreated = [];
  const safeUpdated = [];
  const safeDeleted = [];
  const imageArrayUpdated = []; // for child records (using updated instead of created)

  safesArray.forEach(doc => {
    // Process the child image records
    if (doc.imageArray && Array.isArray(doc.imageArray)) {
      doc.imageArray.forEach((image, index) => {
        // Generate a unique id for each child record.
        imageArrayUpdated.push({
          id: `${doc.id}-${index}`, // Simple unique key; consider using a proper UUID in production.
          ...image,
          safe_id: doc.id, // Foreign key linking to parent safe.
        });
      });
    }
    // Create a safe record without the nested imageArray property.
    const safeRecord = {...doc};
    delete safeRecord.imageArray;

    // Mark as deleted or updated.
    if (doc.deleted) {
      safeDeleted.push(doc.id);
    } else {
      safeUpdated.push(safeRecord);
    }
  });

  return {
    safes: {created: safeCreated, updated: safeUpdated, deleted: safeDeleted},
    safe_image_arrays: {created: [], updated: imageArrayUpdated, deleted: []},
  };
}

/**
 * 3) Main Sync Function: Only Pulls Safes (No Push)
 */
export async function syncSafes(database) {
  console.log('[syncSafes] Starting sync...');
  try {
    await synchronize({
      database,
      sendCreatedAsUpdated: true,

      pullChanges: async ({lastPulledAt}) => {
        console.log('[PullChanges] Started with lastPulledAt:', lastPulledAt);

        try {
          const query = PULL_SAFES_GQL;
          // Use lastPulledAt if available, otherwise default to 1970.
          const sinceValue = lastPulledAt
            ? new Date(lastPulledAt).toISOString()
            : '1970-01-01T00:00:00.000Z';

          let allSafes = [];
          const limit = 25; // Number of records per page
          let currentPage = 0;
          let hasMore = true;

          while (hasMore) {
            const response = await fetch('http://34.32.33.187/graphql', {
              method: 'POST',
              headers: {'Content-Type': 'application/json'},
              body: JSON.stringify({
                query,
                variables: {since: sinceValue, page: currentPage, limit},
              }),
            });

            if (!response.ok) {
              console.error(
                '[PullChanges] Response error:',
                response.statusText,
              );
              throw new Error(`GraphQL pull error: ${response.statusText}`);
            }

            const json = await response.json();

            if (json.errors) {
              console.error('[PullChanges] GraphQL errors found:', json.errors);
              throw new Error(`GraphQL errors: ${JSON.stringify(json.errors)}`);
            }

            // Ensure pullSafes is an array even if undefined.
            const pullSafes =
              json.data && json.data.pullSafes ? json.data.pullSafes : [];

            console.log(pullSafes.length, 'is this ?');
            allSafes = allSafes.concat(pullSafes);

            if (pullSafes.length < limit) {
              hasMore = false;
            } else {
              currentPage++;
            }
          }

          // Convert to Watermelon's changes format.
          const safeChanges = convertServerSafesToWatermelon(allSafes);
          const newTimestamp = Date.now();

          return {changes: safeChanges, timestamp: newTimestamp};
        } catch (error) {
          console.error('[PullChanges] Error encountered:', error);
          throw error;
        }
      },

      // ------------------ PUSH CHANGES ------------------
      // We're doing a read-only sync, so we omit pushChanges or just provide an empty function:
      pushChanges: async () => {
        console.log('[syncSafes] pushChanges called - no-op (read-only).');
      },
    });

    console.log('[syncSafes] Sync completed without errors.');
  } catch (error) {
    console.error('[syncSafes] Sync failed:', error);
    throw error; // re-throw if you want the caller to handle it
  }
}
