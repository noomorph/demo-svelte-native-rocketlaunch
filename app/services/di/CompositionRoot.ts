import {RemoteDataSource} from "~/services/dataSource/RemoteDataSource";
import {CachedDataSource} from "~/services/dataSource/CachedDataSource";
import {DataSource} from "~/services/dataSource/DataSource";
import {getFileAccess} from '@nativescript/core';

export default class CompositionRoot {
  private readonly _dataSource = new RemoteDataSource();
  public readonly dataSource: CachedDataSource = new CachedDataSource(getFileAccess(), this._dataSource);
}
