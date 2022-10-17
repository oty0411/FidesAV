// #region Error code
/**
 * エラーコード
 */
export enum AppErrorCode {
  Success = 0,
  Error = 1,
}

/**
 * エラーサブコード
 */
export enum AppErrorSubCode {
  None = 0,
  Error = 1,
  DuplicateUser = 2, // ユーザ重複
  UserLoginFail = 3, // ユーザログイン失敗
  NotFoundUserData = 4, // ユーザーデータなし
}

/**
 * 処理実行結果格納クラス
 */
export class AppResult {
  // エラーコード
  public Code: AppErrorCode
  // サブコード
  public SubCode: AppErrorSubCode
  // コンストラクタ
  constructor() {
    this.Code = AppErrorCode.Success
    this.SubCode = AppErrorSubCode.None
  }
}
// #endregion Error Code

// #region User
// #endregion User

// #region App types
export enum LoginUserType {
  // 女優
  Actor = 0,
  // メーカー
  Marker = 1,
}

export type AuthUser = {
  // ユーザーID
  id: number
  // ユーザータイプ
  type: LoginUserType
  // ログインユーザー名
  user_name: string
  // プロフィール画像パス
  profile_image_path: string
}
// AuthUser型デフォルトオブジェクト
export function GetDefaultAuthUser(): AuthUser {
  const obj: AuthUser = {
    id: -1,
    type: LoginUserType.Actor,
    user_name: 'anonymous',
    profile_image_path: '',
  }
  return obj
}
// AuthUser型デフォルトオブジェクト
export function GetObj_AuthUser(): AuthUser {
  const obj: AuthUser = {
    id: 0,
    type: LoginUserType.Actor,
    user_name: 'anonymous',
    profile_image_path: '',
  }
  return obj
}

// システム利用アカウント
export type SystemAcount = {
  // ユーザーID
  id: number
  // ログインID
  login_id: string
  // ログインパスワード
  password: string
  // ユーザータイプ
  type: LoginUserType
  // 管理者
  is_admin: boolean
  // 削除状態
  is_deleted: boolean
}

/**
 * 血液型
 */
export enum BloodType {
  A = 0,
  B = 1,
  O = 2,
  AB = 3,
}

/**
 * 洋服サイズ
 */
export enum ClothesSizeType {
  SS = 0,
  S = 1,
  M = 2,
  L = 3,
  L2 = 4,
  L3 = 5,
  L4 = 6,
  L5 = 7,
  L6 = 8,
  L7 = 9,
  L8 = 10,
  L9 = 11,
  L10 = 12,
}

/**
 * 洋服サイズ(文字列)
 */
export const ClothesSizeTypeString = {
  '0': 'SS',
  '1': 'S',
  '2': 'M',
  '3': 'L',
  '4': '2L',
  '5': '3L',
  '6': '4L',
  '7': '5L',
  '8': '6L',
  '9': '7L',
  '10': '8L',
  '11': '9L',
  '12': '10L',
}

/**
 * バストサイズ
 */
export enum BreastSizeType {
  A = 0,
  B = 1,
  C = 2,
  D = 3,
  E = 4,
  F = 5,
  G = 6,
  H = 7,
  I = 8,
  J = 9,
  K = 10,
  L = 11,
  M = 12,
  N = 13,
}
/**
 * バストサイズ(文字列)
 */
export const BreastSizeTypeString = {
  '0': 'A',
  '1': 'B',
  '2': 'C',
  '3': 'D',
  '4': 'E',
  '5': 'F',
  '6': 'G',
  '7': 'H',
  '8': 'I',
  '9': 'J',
  '10': 'K',
  '11': 'L',
  '12': 'M',
  '13': 'N',
}
/**
 * プレイ条件選択肢
 */
export enum PlayConditionChoice {
  NG = 0,
  OK = 1,
  NEGOTIABLE = 2,
}

// ユーザー
export type User = {
  // ユーザーID
  id: number
  // メールアドレス
  email: string
  // ログインパスワード
  password: string
  // ユーザー名
  user_name: string
  // 本名
  real_name: string
  // プロフィール画像パス
  image_path: string
  // 誕生日
  birthday: string
  // 血液型
  blood_type: number
  // 身長
  height: number
  // 体重
  weight: number
  // 服サイズ
  clothes_size: number
  // 靴サイズ
  shoes_size: number
  // バストサイズ
  breast_size: number
  // バストトップサイズ
  breast_top_size: number
  // バストアンダーサイズ
  breast_under_size: number
  // ウェストサイズ
  waist_size: number
  // ヒップサイズ
  hip_size: number
  // 公開
  open: boolean
  // 管理者
  is_admin: boolean
  // 削除状態
  is_deleted: boolean
}
// User型初期化オブジェクト
export function GetObj_User() {
  const obj: User = {
    id: 0,
    email: 'sample@sample.com',
    password: '',
    user_name: '',
    real_name: '',
    image_path: '',
    birthday: '',
    height: 0,
    weight: 0,
    clothes_size: 0,
    shoes_size: 0,
    breast_size: 0,
    breast_top_size: 0,
    breast_under_size: 0,
    waist_size: 0,
    hip_size: 0,
    open: false,
    is_admin: false,
    is_deleted: false,
  }
  return obj
}

// User型初期化オブジェクト
export function GetCopyObj_User(src: User) {
  if (!src) {
    return null
  }

  const obj: User = {
    id: src.id,
    email: src.email,
    password: src.password,
    user_name: src.user_name,
    real_name: src.real_name,
    image_path: src.image_path,
    birthday: src.birthday,
    height: src.height,
    weight: src.weight,
    clothes_size: src.clothes_size,
    shoes_size: src.shoes_size,
    breast_size: src.breast_size,
    breast_top_size: src.breast_top_size,
    breast_under_size: src.breast_under_size,
    waist_size: src.waist_size,
    hip_size: src.hip_size,
    open: src.open,
    is_admin: src.is_admin,
    is_deleted: src.is_deleted,
  }
  return obj
}
// #endregion App types

// #region API
// APIコンテキスト
export type ApiContext = {
  apiRootUrl: string
}
// #endregion API

// #region Component
/**
 * リンク情報を固めたもの
 */
export type LinkInformationSet = {
  dispaleyName: string
  pageLink: string
}

// #endregion Component
