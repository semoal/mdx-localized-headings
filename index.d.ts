import {VFile} from 'vfile'

export function transform(originalFilePath: string, toTransformPath: string): Promise<VFile>