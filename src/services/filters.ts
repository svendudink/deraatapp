// filter.js
import {defaultInputs} from '../constants/SafesGuide/Constants';

/**
 * Helper: Get the field value from either the hydrated object or its _raw.
 */
function getValue(object, field) {
  if (field === 'imageArray') {
    return object.imageArray;
  }
  return object._raw ? object._raw[field] : object[field];
}

// 1) The main filter function
export const filter = (inputValues, SAFES, settings) => {
  // Use the hydrated objects directly (no conversion to plain objects)
  const filterData = filterObjects(
    generateOutput(inputValues, defaultInputs),
    SAFES, // now hydrated objects
    settings,
  );

  // Return [uniqueByFamilyName, allFiltered]
  return [filterByUniqueFamilyName(filterData), filterData];
};

// 2) Helper function for building filter criteria
function generateOutput(input, defaultInputs) {
  let output = {};

  // Initialize the output object with the expected structure
  for (let key in input) {
    if (typeof input[key] === 'object' && !Array.isArray(input[key])) {
      output[key] = [];
    } else {
      output[key] = '';
    }
  }

  for (const defaultInput of defaultInputs) {
    const {id, searchArray, group} = defaultInput;

    // Make sure the group exists in the input
    if (input[group] && input[group][id] === true) {
      output[group] = output[group].concat(searchArray);
    }
  }

  // Ensure certain object keys remain unmodified
  const unmodifiedKeys = [
    'searchByDimensions',
    'searchByOther',
    'searchByWeight',
  ];
  for (let key of unmodifiedKeys) {
    if (input[key]) {
      output[key] = input[key];
    }
  }
  return output;
}

// 3) Your filterByUniqueFamilyName logic (using getValue for proper access)
export function filterByUniqueFamilyName(arr) {
  const uniqueNames = {};

  // First pass: filter out items with unique family names and valid pictures
  const firstPass = arr.filter(item => {
    const name = getValue(item, 'nameSeriesEn');
    const isUniqueName = !uniqueNames[name];
    const imageArray = getValue(item, 'imageArray');
    const hasValidPicture = imageArray && imageArray.length !== 0;

    if (isUniqueName && hasValidPicture) {
      uniqueNames[name] = true;
      return true;
    }
    return false;
  });

  // Second pass: find first occurrence of items with unique family names that have "none" for picture
  arr.forEach(item => {
    const name = getValue(item, 'nameSeriesEn');
    if (!uniqueNames[name]) {
      uniqueNames[name] = true;
      // Force picture1 false if no valid pic found
      firstPass.push({...item, picture1: false});
    }
  });

  return firstPass;
}

// 4) The main filter function that runs all checks
function filterObjects(filterCriteria, SAFES_ARRAY, settings) {
  return SAFES_ARRAY.filter(object => {
    return [
      checkMatch(
        object,
        'fireResistantClassificationEn',
        filterCriteria.fireResistantClassification,
        'includes',
      ),
      checkMatch(
        object,
        'burglaryClassificationEn',
        filterCriteria.burglaryClassification,
        'equals',
      ),
      checkArrayMatch(
        object,
        'kluizenwijzer',
        filterCriteria.kluizenwijzer,
        'contains',
      ),
      checkDimensionMatch(
        object,
        'insideDimensionHightInMm',
        filterCriteria.searchByDimensions.innerHeightMin,
        filterCriteria.searchByDimensions.innerHeightMax,
      ),
      checkDimensionMatch(
        object,
        'outsideDimensionHightInMm',
        filterCriteria.searchByDimensions.outerHeightMin,
        filterCriteria.searchByDimensions.outerHeightMax,
      ),
      checkDimensionMatch(
        object,
        'insideDimensionWideInMm',
        filterCriteria.searchByDimensions.innerWidthMin,
        filterCriteria.searchByDimensions.innerWidthMax,
      ),
      checkDimensionMatch(
        object,
        'outsideDimensionWideInMm',
        filterCriteria.searchByDimensions.outerWidthMin,
        filterCriteria.searchByDimensions.outerWidthMax,
      ),
      checkDimensionMatch(
        object,
        'insideDimensionDepthInMm',
        filterCriteria.searchByDimensions.innerDepthMin,
        filterCriteria.searchByDimensions.innerDepthMax,
      ),
      checkDimensionMatch(
        object,
        'outsideDimensionDepthInMm',
        filterCriteria.searchByDimensions.outerDepthMin,
        filterCriteria.searchByDimensions.outerDepthMax,
      ),
      checkDimensionMatch(
        object,
        'weightInKg',
        filterCriteria.searchByWeight.weightMin,
        filterCriteria.searchByWeight.weightMax,
      ),
      checkDimensionMatch(
        object,
        'shelves',
        filterCriteria.searchByOther.shelvesMin,
        filterCriteria.searchByOther.shelvesMax,
      ),
      checkDimensionMatch(
        object,
        'drawers',
        filterCriteria.searchByOther.drawersMin,
        filterCriteria.searchByOther.drawersMax,
      ),
      checkDimensionMatch(
        object,
        'numberKeyHooks',
        filterCriteria.searchByOther.hooksMin,
        filterCriteria.searchByOther.hooksMax,
      ),
      checkDimensionMatch(
        object,
        'weapons',
        filterCriteria.searchByOther.gunHoldersMin,
        filterCriteria.searchByOther.gunHoldersMax,
      ),
      // If store === 'UK', only show if object.shownOnUKWebsite is not 'Nee'
      settings.store !== 'UK' ||
        (getValue(object, 'shownOnUKWebsite') &&
          getValue(object, 'shownOnUKWebsite') !== 'Nee'),
    ].every(Boolean);
  });
}

// 5) Individual checks
function checkMatch(object, field, criteria, type) {
  if (!criteria || criteria.length === 0) return true;
  const value = getValue(object, field);
  if (!value) return false;

  if (type === 'includes') {
    return criteria.some(c => value.includes(c));
  } else if (type === 'equals') {
    return criteria.some(c => value.toLowerCase() === c.toLowerCase());
  }
  return false;
}

function checkArrayMatch(object, field, criteria, type) {
  if (!criteria || criteria.length === 0) return true;
  const value = getValue(object, field);
  if (!value) return false;
  const objectArray = value.split(/[, ]+/).filter(val => val);

  if (type === 'contains') {
    return criteria.some(criterion =>
      objectArray.some(val =>
        val.toLowerCase().includes(criterion.toLowerCase()),
      ),
    );
  }
  return false;
}

function checkDimensionMatch(object, field, minCriteria, maxCriteria) {
  if (!minCriteria && !maxCriteria) return true;

  const value = Number(getValue(object, field));
  if (Number.isNaN(value)) return false;

  if (minCriteria && !maxCriteria && value >= minCriteria) {
    return true;
  }
  if (!minCriteria && maxCriteria && value <= maxCriteria) {
    return true;
  }
  if (
    minCriteria &&
    maxCriteria &&
    value >= minCriteria &&
    value <= maxCriteria
  ) {
    return true;
  }
  return false;
}
