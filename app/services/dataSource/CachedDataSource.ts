import {FileSystemAccess} from "@nativescript/core/file-system/file-system-access";
import {Launch} from "~/dto";
import {DataSource} from "~/services/dataSource/DataSource";
import {CachePendingPromise} from "~/utils/decorators/CachePendingPromise";

export class CachedDataSource implements DataSource {
  constructor(
    private readonly fs: FileSystemAccess,
    private readonly remoteDataSource: DataSource,
  ) {}

  private readonly _cacheDir = this.fs.joinPath(this.fs.getDocumentsFolderPath(), '.cache');
  private readonly _launchesCache = this.fs.joinPath(this._cacheDir, 'launches');

  @CachePendingPromise()
  public async getLaunches(): Promise<Launch[]> {
    if (this.fs.fileExists(this._launchesCache)) {
      const launches = await this.fs.readTextAsync(this._launchesCache);
      return JSON.parse(launches);
    }

    const launches = await this.remoteDataSource.getLaunches();
    const cacheFile = await this._mkFile(this._launchesCache);
    await this.fs.writeTextAsync(cacheFile, JSON.stringify(launches));
    return launches;
  }

  public async invalidateLaunches(): Promise<void> {
    return this._rmFile(this._launchesCache);
  }

  @CachePendingPromise()
  private _mkFile(filePath: string): Promise<string> {
    return new Promise((resolve, reject) => {
      const { path } = this.fs.getFile(filePath, reject);
      resolve(path);
    });
  }

  @CachePendingPromise()
  private _rmFile(filePath): Promise<void> {
    return new Promise((resolve, reject) => {
      if (this.fs.fileExists(filePath)) {
        this.fs.deleteFile(this._launchesCache, reject);
      }

      resolve();
    });
  }
}
