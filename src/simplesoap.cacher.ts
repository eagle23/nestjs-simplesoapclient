/**
 * @author Andrey Orlin
 * @email ao@instafxgroup.com
 * @create date 2021-03-26 12:03:37
 * @modify date 2021-03-26 12:03:37
 * @desc fileCacher
 */

import { readFile, writeFile } from 'fs/promises';
import { tmpdir } from 'os';
import { join } from 'path';
import { ISimplesoapCacher } from "./simplesoap.interface"

export const fileCacher: ISimplesoapCacher = {
    get: async (key: string): Promise<string | null> => {
        const path = join(tmpdir(), encodeURIComponent(key))
        return (await readFile(path)).toString()
    },

    save: async (key: string, data: string): Promise<void> => {
        const path = join(tmpdir(), encodeURIComponent(key))
        return await writeFile(path, data)
    }
}
