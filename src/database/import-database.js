import * as FileSystem from 'expo-file-system';
import * as SQLite from 'expo-sqlite';
import { Asset } from 'expo-asset';

async function OpenDatabase(pathToDatabaseFile) {
  const sqliteDir = FileSystem.Paths.document.uri + '/SQLite';
  if (!(await FileSystem.Paths.document.exists())) {
    await FileSystem.Paths.document.create();
  }
  const asset = await Asset.fromModule((pathToDatabaseFile)).downloadAsync();
  const targetPath = sqliteDir + '/database.db';
  await FileSystem.Paths.document.moveAsync({
    from: asset.localUri,
    to: targetPath,
  });
  return SQLite.openDatabaseAsync('database.db');
}

export default OpenDatabase