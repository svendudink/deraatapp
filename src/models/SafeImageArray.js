import {Model} from '@nozbe/watermelondb';
import {field, relation} from '@nozbe/watermelondb/decorators';

export class SafeImageArray extends Model {
  // Change the table name to something plural, e.g., 'safe_image_arrays'
  static table = 'safe_image_arrays';

  @field('blob') blob;
  @field('filename') filename;
  @field('hash') hash;

  // This defines the relation to the safes table using the foreign key 'safe_id'
  @relation('safes', 'safe_id') safe;
}
