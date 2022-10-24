import * as UserTypes from '../../types/userTypes'
import { ErrorCodeTranslator } from '../errorCodeTranslator'
import { ApiRequestFetcher, ApiRequestType } from 'utils'

// スケジュール追加
export const PostSchedule = async (
  context: UserTypes.ApiContext,
  postData: UserTypes.ActorSchedule,
): Promise<{ result: UserTypes.AppResult; data: UserTypes.ActorSchedule }> => {
  const address = `${context.apiRootUrl.replace(/\/$/g, '')}/actor_schedules`
  const apiResult: {
    code: number
    message: string
    data: UserTypes.ActorSchedule
  } = await ApiRequestFetcher(address, ApiRequestType.POST, postData)
  //console.log(apiResult)
  return {
    result: ErrorCodeTranslator.ToAppResult(apiResult.code),
    data: apiResult.data,
  }
}

// スケジュール取得
export const GetSchedule = async (
  context: UserTypes.ApiContext,
  id: number,
): Promise<{ result: UserTypes.AppResult; data: UserTypes.ActorSchedule }> => {
  const address = `${context.apiRootUrl.replace(
    /\/$/g,
    '',
  )}/actor_schedules/${id}`
  const apiResult: {
    code: number
    message: string
    data: UserTypes.ActorSchedule
  } = await ApiRequestFetcher(address, ApiRequestType.GET, null)
  //console.log(apiResult)
  return {
    result: ErrorCodeTranslator.ToAppResult(apiResult.code),
    data: apiResult.data,
  }
}

// スケジュール編集
export const EditSchedule = async (
  context: UserTypes.ApiContext,
  postData: UserTypes.ActorSchedule,
): Promise<{ result: UserTypes.AppResult; data: UserTypes.ActorSchedule }> => {
  const address = `${context.apiRootUrl.replace(/\/$/g, '')}/actor_schedules/${
    postData.id
  }`
  const apiResult: {
    code: number
    message: string
    data: UserTypes.ActorSchedule
  } = await ApiRequestFetcher(address, ApiRequestType.PUT, postData)
  //console.log(apiResult)
  return {
    result: ErrorCodeTranslator.ToAppResult(apiResult.code),
    data: apiResult.data,
  }
}

// スケジュール削除
export const DeleteSchedule = async (
  context: UserTypes.ApiContext,
  id: number,
): Promise<{ result: UserTypes.AppResult }> => {
  const address = `${context.apiRootUrl.replace(
    /\/$/g,
    '',
  )}/actor_schedules/${id}`
  const apiResult: {
    code: number
    message: string
  } = await ApiRequestFetcher(address, ApiRequestType.DELETE, null)
  //console.log(apiResult)
  return {
    result: ErrorCodeTranslator.ToAppResult(apiResult.code),
  }
}

// スケジュールリスト取得
export const GetScheduleList = async (
  context: UserTypes.ApiContext,
  userId: number,
): Promise<{
  result: UserTypes.AppResult
  data: UserTypes.ActorSchedule[]
}> => {
  const address = `${context.apiRootUrl.replace(
    /\/$/g,
    '',
  )}/actor_schedules/users/${userId}`
  const apiResult: {
    code: number
    message: string
    data: UserTypes.ActorSchedule[]
  } = await ApiRequestFetcher(address, ApiRequestType.GET, null)
  //console.log(apiResult)
  return {
    result: ErrorCodeTranslator.ToAppResult(apiResult.code),
    data: apiResult.data,
  }
}

// 出演依頼POST
export const PostAppearanceRequest = async (
  context: UserTypes.ApiContext,
  postData: UserTypes.Offer,
): Promise<{ result: UserTypes.AppResult; data: UserTypes.Offer }> => {
  const address = `${context.apiRootUrl.replace(/\/$/g, '')}/offers`
  const apiResult: {
    code: number
    message: string
    data: UserTypes.Offer
  } = await ApiRequestFetcher(address, ApiRequestType.POST, postData)
  //console.log(apiResult)
  return {
    result: ErrorCodeTranslator.ToAppResult(apiResult.code),
    data: apiResult.data,
  }
}

// 出演依頼取得
export const GetAppearanceRequest = async (
  context: UserTypes.ApiContext,
  id: number,
): Promise<{
  result: UserTypes.AppResult
  data: UserTypes.OfferWithOptionData
}> => {
  const address = `${context.apiRootUrl.replace(
    /\/$/g,
    '',
  )}/offers/${id}/detail`
  const apiResult: {
    code: number
    message: string
    data: UserTypes.OfferWithOptionData
  } = await ApiRequestFetcher(address, ApiRequestType.GET, null)
  //console.log(apiResult)
  return {
    result: ErrorCodeTranslator.ToAppResult(apiResult.code),
    data: apiResult.data,
  }
}

// 出演依頼Edit
export const EditAppearanceRequest = async (
  context: UserTypes.ApiContext,
  postData: UserTypes.Offer,
): Promise<{ result: UserTypes.AppResult; data: UserTypes.Offer }> => {
  const address = `${context.apiRootUrl.replace(/\/$/g, '')}/offers/${
    postData.id
  }`
  const apiResult: {
    code: number
    message: string
    data: UserTypes.Offer
  } = await ApiRequestFetcher(address, ApiRequestType.PUT, postData)
  //console.log(apiResult)
  return {
    result: ErrorCodeTranslator.ToAppResult(apiResult.code),
    data: apiResult.data,
  }
}

// 出演依頼編集
export const DeleteAppearanceRequest = async (
  context: UserTypes.ApiContext,
  id: number,
): Promise<{ result: UserTypes.AppResult }> => {
  const address = `${context.apiRootUrl.replace(/\/$/g, '')}/offers/${id}`
  const apiResult: {
    code: number
    message: string
  } = await ApiRequestFetcher(address, ApiRequestType.DELETE, null)
  //console.log(apiResult)
  return {
    result: ErrorCodeTranslator.ToAppResult(apiResult.code),
  }
}

// 出演依頼一覧取得
export const GetAppearanceRequestList = async (
  context: UserTypes.ApiContext,
  userId: number,
): Promise<{
  result: UserTypes.AppResult
  data: UserTypes.OfferWithOptionData[]
}> => {
  const address = `${context.apiRootUrl.replace(
    /\/$/g,
    '',
  )}/offers/users/${userId}`
  const apiResult: {
    code: number
    message: string
    data: UserTypes.OfferWithOptionData[]
  } = await ApiRequestFetcher(address, ApiRequestType.GET, null)
  //console.log(apiResult)
  return {
    result: ErrorCodeTranslator.ToAppResult(apiResult.code),
    data: apiResult.data,
  }
}

// 出演依頼レスポンスPOST
export const PostAppearanceRequestResponse = async (
  context: UserTypes.ApiContext,
  postData: UserTypes.OfferResponse,
): Promise<{ result: UserTypes.AppResult; data: UserTypes.OfferResponse }> => {
  const address = `${context.apiRootUrl.replace(/\/$/g, '')}/offer_responses`
  const apiResult: {
    code: number
    message: string
    data: UserTypes.OfferResponse
  } = await ApiRequestFetcher(address, ApiRequestType.POST, postData)
  //console.log(apiResult)
  return {
    result: ErrorCodeTranslator.ToAppResult(apiResult.code),
    data: apiResult.data,
  }
}

// 出演依頼レスポンス取得
export const GetAppearanceRequestResponse = async (
  context: UserTypes.ApiContext,
  id: number,
): Promise<{
  result: UserTypes.AppResult
  data: UserTypes.OfferResponseWithOptionData
}> => {
  const address = `${context.apiRootUrl.replace(
    /\/$/g,
    '',
  )}/offers/${id}/detail`
  const apiResult: {
    code: number
    message: string
    data: UserTypes.OfferResponseWithOptionData
  } = await ApiRequestFetcher(address, ApiRequestType.GET, null)
  //console.log(apiResult)
  return {
    result: ErrorCodeTranslator.ToAppResult(apiResult.code),
    data: apiResult.data,
  }
}

// 出演依頼レスポンス一覧取得
export const GetAppearanceRequestResponseList = async (
  context: UserTypes.ApiContext,
  userId: number,
): Promise<{
  result: UserTypes.AppResult
  data: UserTypes.OfferResponseWithOptionData[]
}> => {
  const address = `${context.apiRootUrl.replace(
    /\/$/g,
    '',
  )}/offers/users/${userId}`
  const apiResult: {
    code: number
    message: string
    data: UserTypes.OfferResponseWithOptionData[]
  } = await ApiRequestFetcher(address, ApiRequestType.GET, null)
  //console.log(apiResult)
  return {
    result: ErrorCodeTranslator.ToAppResult(apiResult.code),
    data: apiResult.data,
  }
}
