import {Model} from '@nozbe/watermelondb';
import {field, children} from '@nozbe/watermelondb/decorators';

export class Safe extends Model {
  static table = 'safes';

  static associations = {
    safe_image_arrays: {type: 'has_many', foreignKey: 'safe_id'},
  };

  // Renamed __v to version (since leading underscores are problematic)

  @field('version') version;

  // Accessory fields (mixed? in Realm, stored as text here)
  @field('accessory1') accessory1;
  @field('accessory2') accessory2;
  @field('accessory3') accessory3;
  @field('accessory4') accessory4;
  @field('accessory5') accessory5;
  @field('accessory6') accessory6;
  @field('accessory7') accessory7;
  @field('accessory8') accessory8;
  @field('accessory9') accessory9;
  @field('accessory10') accessory10;

  // Other fields
  @field('articleNumber') articleNumber;
  @field('burglaryClassificationEn') burglaryClassificationEn;
  @field('burglaryClassificationFr') burglaryClassificationFr;
  @field('burglaryClassificationNl') burglaryClassificationNl;
  @field('cataloguspaginaFR') cataloguspaginaFR;
  @field('cataloguspaginaNL') cataloguspaginaNL;
  @field('categoryEn') categoryEn;
  @field('categoryFr') categoryFr;
  @field('categoryNl') categoryNl;
  @field('chapterEn') chapterEn;
  @field('chapterFr') chapterFr;
  @field('chapterNl') chapterNl;
  @field('descriptionEn') descriptionEn;
  @field('descriptionFr') descriptionFr;
  @field('descriptionNl') descriptionNl;
  @field('divisie') divisie;
  @field('drawers') drawers;
  @field('eanCode') eanCode;
  @field('eurosafeEuroGradeEn') eurosafeEuroGradeEn;
  @field('eurosafeEuroGradeFr') eurosafeEuroGradeFr;
  @field('eurosafeEuroGradeNl') eurosafeEuroGradeNl;
  @field('fireResistantClassificationEn') fireResistantClassificationEn;
  @field('fireResistantClassificationFr') fireResistantClassificationFr;
  @field('fireResistantClassificationNl') fireResistantClassificationNl;
  @field('fireResistantClassificationExplanationEn')
  fireResistantClassificationExplanationEn;
  @field('fireResistantClassificationExplanationFr')
  fireResistantClassificationExplanationFr;
  @field('fireResistantClassificationExplanationNl')
  fireResistantClassificationExplanationNl;
  @field('gerelateerdeArtikelen') gerelateerdeArtikelen;
  @field('handleiding1') handleiding1;
  @field('handleiding2') handleiding2;

  // imageArray in Realm becomes a separate table/relationship
  @children('safe_image_arrays') imageArray;

  @field('insideDimensionDepthInMm') insideDimensionDepthInMm;
  @field('insideDimensionHightInMm') insideDimensionHightInMm;
  @field('insideDimensionWideInMm') insideDimensionWideInMm;
  @field('insuranceRatingFr') insuranceRatingFr;
  @field('insuranceRatingNl') insuranceRatingNl;
  @field('kluizenwijzer') kluizenwijzer;
  @field('logo1Nl') logo1Nl;
  @field('logo2Nl') logo2Nl;
  @field('manual1') manual1;
  @field('manual2') manual2;
  @field('manuelDInstructions1') manuelDInstructions1;
  @field('manuelDInstructions2') manuelDInstructions2;
  @field('modelEn') modelEn;
  @field('modelFr') modelFr;
  @field('modelNl') modelNl;
  @field('nameSeriesEn') nameSeriesEn;
  @field('nameSeriesFr') nameSeriesFr;
  @field('nameSeriesNl') nameSeriesNl;
  @field('noBackgroundImage') noBackgroundImage;
  @field('numberKeyHooks') numberKeyHooks;
  @field('outsideDimensionDepthInMm') outsideDimensionDepthInMm;
  @field('outsideDimensionHightInMm') outsideDimensionHightInMm;
  @field('outsideDimensionWideInMm') outsideDimensionWideInMm;
  @field('picture1') picture1;
  @field('picture2') picture2;
  @field('picture3') picture3;
  @field('sessionId') sessionId;
  @field('shelves') shelves;
  @field('shownOnUKWebsite') shownOnUKWebsite;

  // timeStamp was double? in Realm, so we just store as a field (usually a number)
  @field('timeStamp') timeStamp;

  @field('ukInsuranceRating') ukInsuranceRating;
  @field('volumeInLiters') volumeInLiters;
  @field('weapons') weapons;
  @field('weightInKg') weightInKg;

  // If you want to include an owner_id (string?), uncomment below if needed:
  // @field('owner_id') ownerId;
}
