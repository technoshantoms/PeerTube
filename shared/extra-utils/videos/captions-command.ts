import { ResultList, VideoCaption } from '@shared/models'
import { HttpStatusCode } from '../../core-utils/miscs/http-error-codes'
import { buildAbsoluteFixturePath } from '../miscs/miscs'
import { AbstractCommand, OverrideCommandOptions } from '../shared'

export class CaptionsCommand extends AbstractCommand {

  createVideoCaption (options: OverrideCommandOptions & {
    videoId: string | number
    language: string
    fixture: string
    mimeType?: string
  }) {
    const { videoId, language, fixture, mimeType } = options

    const path = '/api/v1/videos/' + videoId + '/captions/' + language

    const captionfile = buildAbsoluteFixturePath(fixture)
    const captionfileAttach = mimeType
      ? [ captionfile, { contentType: mimeType } ]
      : captionfile

    return this.putUploadRequest({
      ...options,

      path,
      fields: {},
      attaches: {
        captionfile: captionfileAttach
      },
      implicitToken: true,
      defaultExpectedStatus: HttpStatusCode.NO_CONTENT_204
    })
  }

  listVideoCaptions (options: OverrideCommandOptions & {
    videoId: string | number
  }) {
    const { videoId } = options
    const path = '/api/v1/videos/' + videoId + '/captions'

    return this.getRequestBody<ResultList<VideoCaption>>({
      ...options,

      path,
      implicitToken: false,
      defaultExpectedStatus: HttpStatusCode.OK_200
    })
  }

  deleteVideoCaption (options: OverrideCommandOptions & {
    videoId: string | number
    language: string
  }) {
    const { videoId, language } = options
    const path = '/api/v1/videos/' + videoId + '/captions/' + language

    return this.deleteRequest({
      ...options,

      path,
      implicitToken: true,
      defaultExpectedStatus: HttpStatusCode.NO_CONTENT_204
    })
  }
}
