import {Model} from '@nozbe/watermelondb';
import {field} from '@nozbe/watermelondb/decorators';

// WatermelonDB model for 'stocks' table, mirroring the 'safes' schema
export class Stock extends Model {
  static table = 'stocks';

  // Optional: rename __v to version if you use versioning
  @field('version') version;

  // Core stock fields
  @field('productId') productId;
  @field('productDescription') productDescription;
  @field('eanCode') eanCode;
  @field('availableStock') availableStock;

  // Sync helpers
  @field('deleted') deleted;
  @field('updated_at') updatedAt;
}
