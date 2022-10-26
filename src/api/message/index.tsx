import * as UserTypes from '../../types/userTypes'
import { ErrorCodeTranslator } from '../errorCodeTranslator'
import { ApiRequestFetcher, ApiRequestType } from 'utils'

// チャットメッセージ送信
export const PostChatMessage = async (
  context: UserTypes.ApiContext,
  postData: UserTypes.Chat,
): Promise<{ result: UserTypes.AppResult; data: UserTypes.ChatWithUser }> => {
  const address = `${context.apiRootUrl.replace(/\/$/g, '')}/chats`
  const apiResult: {
    code: number
    message: string
    data: UserTypes.ChatWithUser
  } = await ApiRequestFetcher(address, ApiRequestType.POST, postData)
  //console.log(apiResult)
  return {
    result: ErrorCodeTranslator.ToAppResult(apiResult.code),
    data: apiResult.data,
  }
}

// 対全ユーザーチャットメッセージ取得
export const GetChatMessageForAllUsers = async (
  context: UserTypes.ApiContext,
  user_id: number,
  user_type: UserTypes.LoginUserType,
): Promise<{
  result: UserTypes.AppResult
  data: {
    pairName: string
    pairImagePath: string
    chats: UserTypes.ChatWithUser[]
  }[]
}> => {
  const address = `${context.apiRootUrl.replace(
    /\/$/g,
    '',
  )}/chats/users/${user_id}`
  const apiResult: {
    code: number
    message: string
    data: {
      pairName: string
      pairImagePath: string
      chats: UserTypes.ChatWithUser[]
    }[]
  } = await ApiRequestFetcher(address, ApiRequestType.POST, {
    user_type: user_type,
  })
  //console.log(apiResult)
  return {
    result: ErrorCodeTranslator.ToAppResult(apiResult.code),
    data: apiResult.data,
  }
}

// 受信済み通知一覧取得
export const GetNoticeList = async (
  context: UserTypes.ApiContext,
  userType: UserTypes.LoginUserType,
  userId: number,
): Promise<{
  result: UserTypes.AppResult
  data: UserTypes.UserNotice[]
}> => {
  const address =
    userType == UserTypes.LoginUserType.Actor
      ? `${context.apiRootUrl.replace(/\/$/g, '')}/actor/${userId}/user_notices`
      : `${context.apiRootUrl.replace(/\/$/g, '')}/maker/${userId}/user_notices`

  const apiResult: {
    code: number
    message: string
    data: UserTypes.UserNotice[]
  } = await ApiRequestFetcher(address, ApiRequestType.GET, null)
  //console.log(apiResult)
  return {
    result: ErrorCodeTranslator.ToAppResult(apiResult.code),
    data: apiResult.data,
  }
}
