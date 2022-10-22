// #region Error code

import { stringify } from "querystring"

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
// Bool(整数型)
export enum BoolWithInt {
  // 不定
  Unknown = 0,
  // true
  True = 1,
  // false
  False = 2,
}

export enum LoginUserType {
  // 不定
  Unknown = 0,
  // 女優
  Actor = 1,
  // メーカー
  Marker = 2,
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
    type: LoginUserType.Unknown,
    user_name: 'anonymous',
    profile_image_path: '',
  }
  return obj
}
// AuthUser型デフォルトオブジェクト
export function GetObj_AuthUser(): AuthUser {
  const obj: AuthUser = {
    id: 0,
    type: LoginUserType.Unknown,
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
  is_admin: BoolWithInt
  // 削除状態
  is_deleted: BoolWithInt
}

// システム利用アカウントオブジェクト生成
export function GetObj_SystemAcount(): SystemAcount {
  const obj: SystemAcount = {
    id: 0,
    login_id: 'anonymous',
    password: 'password',
    type: LoginUserType.Actor,
    is_admin: BoolWithInt.False,
    is_deleted: BoolWithInt.False,
  }
  return obj
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
 * 血液型(文字列)
 */
export enum BloodTypeString {
  A = 'A型',
  B = 'B型',
  O = 'O型',
  AB = 'AB型',
}

// 数値の文字列化
export function ConvertToStringBloodType(status: number) {
  // TODO：if使わずにスマートに書き換えたい
  if (status == BloodType.A) {
    return BloodTypeString.A
  } else if (status == BloodType.B) {
    return BloodTypeString.B
  } else if (status == BloodType.O) {
    return BloodTypeString.O
  } else {
    return BloodTypeString.AB
  }
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

// 数値の文字列化
export function ConvertToStringBreastSize(status: number) {
  // TODO：if使わずにスマートに書き換えたい
  return BreastSizeTypeString['3']
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
  // システムアカウント
  acount_id: string
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
  open: BoolWithInt
  // 管理者
  is_admin: BoolWithInt
  // 削除状態
  is_deleted: BoolWithInt
}
// User型初期化オブジェクト
export function GetObj_User() {
  const obj: User = {
    id: 0,
    acount_id: '',
    email: 'sample@sample.com',
    password: '',
    user_name: '',
    real_name: '',
    image_path: '',
    birthday: '',
    blood_type: 0,
    height: 0,
    weight: 0,
    clothes_size: 0,
    shoes_size: 0,
    breast_size: 0,
    breast_top_size: 0,
    breast_under_size: 0,
    waist_size: 0,
    hip_size: 0,
    open: BoolWithInt.False,
    is_admin: BoolWithInt.False,
    is_deleted: BoolWithInt.False,
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
    acount_id: src.acount_id,
    email: src.email,
    password: src.password,
    user_name: src.user_name,
    real_name: src.real_name,
    image_path: src.image_path,
    birthday: src.birthday,
    blood_type: src.blood_type,
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

// メーカー側ユーザー
export type MakerUser = {
  // ユーザーID
  id: number
  // システムアカウント
  acount_id: string
  // メールアドレス
  email: string
  // ログインパスワード
  password: string
  // メーカー名
  maker_name: string
  // プロフィール画像パス
  image_path: string
  // メーカーURL
  url: string
  // 管理者
  is_admin: BoolWithInt
  // 削除状態
  is_deleted: BoolWithInt
}
// MakerUser型初期化オブジェクト
export function GetObj_MakerUser() {
  const obj: MakerUser = {
    id: 0,
    acount_id: '',
    email: 'sample@sample.com',
    password: '',
    maker_name: '',
    image_path: '',
    url: '',
    is_admin: BoolWithInt.False,
    is_deleted: BoolWithInt.False,
  }
  return obj
}

// MakerUser型初期化オブジェクト
export function GetCopyObj_MakerUser(src: MakerUser) {
  if (!src) {
    return null
  }

  const obj: MakerUser = {
    id: src.id,
    acount_id: src.acount_id,
    email: src.email,
    password: src.password,
    maker_name: src.maker_name,
    image_path: src.image_path,
    url: src.url,
    is_admin: src.is_admin,
    is_deleted: src.is_deleted,
  }
  return obj
}

// プレイ条件
export type PlayCondition = {
  // ユーザーID
  id: number
  // ユーザーID
  user_id: number
  // 本番
  honban: BoolWithInt
  // ゴム無
  gomunashi: BoolWithInt
  // 中出し
  nakadashi: BoolWithInt
  // フェラチオ
  ferachio: BoolWithInt
  // イマラチオ
  iramachio: BoolWithInt
  // 口内発射
  kounaihassha: BoolWithInt
  // 顔射
  gansha: BoolWithInt
  // ごっくん
  gokkun: BoolWithInt
  // ぶっかけ
  bukkake: BoolWithInt
  // アナル
  anal: BoolWithInt
  // アナル(指)
  anal_finger: BoolWithInt
  // アナル(おもちゃ)
  anal_toy: BoolWithInt
  // アナル(男根)
  anal_dankon: BoolWithInt
  // おもちゃ
  toys: BoolWithInt
  // ローター
  rotar: BoolWithInt
  // 電マ
  denma: BoolWithInt
  // バイブ
  vibe: BoolWithInt
  // マシンバイブ
  machine_vibe: BoolWithInt
  // 痴女
  chizyo: BoolWithInt
  // 露出
  roshutsu: BoolWithInt
  // 外泊ロケ
  gaihakuroke: BoolWithInt
  // 外国人
  gaikokujin: BoolWithInt
  // レズ(タチ)
  les_tachi: BoolWithInt
  // レズ(ネコ)
  les_neko: BoolWithInt
  // 複数プレイ
  multiplay: BoolWithInt
  // オナニー
  onani: BoolWithInt
  // 剃毛
  teimou: BoolWithInt
  // 放尿
  hounyou: BoolWithInt
  // 飲尿
  innyou: BoolWithInt
  // 浴尿
  yokunyou: BoolWithInt
  // 飲尿・浴尿（擬似）
  giji_innyou: BoolWithInt
  // レイプ
  rape: BoolWithInt
  // レイプ（ハード）
  rape_head: BoolWithInt
  // SM
  sm: BoolWithInt
  // スパンキング
  spamking: BoolWithInt
  // ムチ（バラムチ）
  bara_muchi: BoolWithInt
  // ムチ（１本ムチ）
  ippon_muchi: BoolWithInt
  // ろうそく
  rousoku: BoolWithInt
  // 緊縛
  kinbaku: BoolWithInt
  // 鼻フック
  hanahukku: BoolWithInt
  // 浣腸
  kanchou: BoolWithInt
  // ビンタ
  binta: BoolWithInt
  // 首しめ
  kubisime: BoolWithInt
  // フィスト
  fist: BoolWithInt
  // ダンス
  dance: BoolWithInt
  
}
// PlayCondition型初期化オブジェクト
export function GetObj_PlayCondition() {
  const obj: PlayCondition = {
    id: 0,
    user_id: 0,
    // 本番
    honban: BoolWithInt.False,
    // ゴム無
    gomunashi: BoolWithInt.False,
    // 中出し
    nakadashi: BoolWithInt.False,
    // フェラチオ
    ferachio: BoolWithInt.False,
    // イマラチオ
    iramachio: BoolWithInt.False,
    // 口内発射
    kounaihassha: BoolWithInt.False,
    // 顔射
    gansha: BoolWithInt.False,
    // ごっくん
    gokkun: BoolWithInt.False,
    // ぶっかけ
    bukkake: BoolWithInt.False,
    // アナル
    anal: BoolWithInt.False,
    // アナル(指)
    anal_finger: BoolWithInt.False,
    // アナル(おもちゃ)
    anal_toy: BoolWithInt.False,
    // アナル(男根)
    anal_dankon: BoolWithInt.False,
    // おもちゃ
    toys: BoolWithInt.False,
    // ローター
    rotar: BoolWithInt.False,
    // 電マ
    denma: BoolWithInt.False,
    // バイブ
    vibe: BoolWithInt.False,
    // マシンバイブ
    machine_vibe: BoolWithInt.False,
    // 痴女
    chizyo: BoolWithInt.False,
    // 露出
    roshutsu: BoolWithInt.False,
    // 外泊ロケ
    gaihakuroke: BoolWithInt.False,
    // 外国人
    gaikokujin: BoolWithInt.False,
    // レズ(タチ)
    les_tachi: BoolWithInt.False,
    // レズ(ネコ)
    les_neko: BoolWithInt.False,
    // 複数プレイ
    multiplay: BoolWithInt.False,
    // オナニー
    onani: BoolWithInt.False,
    // 剃毛
    teimou: BoolWithInt.False,
    // 放尿
    hounyou: BoolWithInt.False,
    // 飲尿
    innyou: BoolWithInt.False,
    // 浴尿
    yokunyou: BoolWithInt.False,
    // 飲尿・浴尿（擬似）
    giji_innyou: BoolWithInt.False,
    // レイプ
    rape: BoolWithInt.False,
    // レイプ（ハード）
    rape_head: BoolWithInt.False,
    // SM
    sm: BoolWithInt.False,
    // スパンキング
    spamking: BoolWithInt.False,
    // ムチ（バラムチ）
    bara_muchi: BoolWithInt.False,
    // ムチ（１本ムチ）
    ippon_muchi: BoolWithInt.False,
    // ろうそく
    rousoku: BoolWithInt.False,
    // 緊縛
    kinbaku: BoolWithInt.False,
    // 鼻フック
    hanahukku: BoolWithInt.False,
    // 浣腸
    kanchou: BoolWithInt.False,
    // ビンタ
    binta: BoolWithInt.False,
    // 首しめ
    kubisime: BoolWithInt.False,
    // フィスト
    fist: BoolWithInt.False,
    // ダンス
    dance: BoolWithInt.False,
  }
  return obj
}

// ポートフォリオ
export type Portfolio = {
  // ユーザーID
  id: number
  // ユーザーID
  user_id: number
  // タイトル
  title: string
  // タイトル画像パス
  image_path: string
  // 作品URL
  url: string
}
// Portfolio型初期化オブジェクト
export function GetObj_Portfolio() {
  const obj: Portfolio = {
    id: 0,
    user_id: 0,
    title: '',
    image_path: '',
    url: '',
  }
  return obj
}

// (通信における)送信方向
export enum SendDirection {
  // 不定
  Unknown = 0,
  // 女優⇒メーカー
  ToMakerFromActor = 1,
  // メーカー⇒女優
  ToActorFromMaker = 2,
  // 双方向
  ToWay = 3,
}

// チャット
export type Chat = {
  // ID
  id: number
  // ユーザーID(女優)
  actor_user_id: number
  // ユーザーID(メーカー)
  maker_user_id: number
  // 送信方法
  sender_dir: SendDirection
  // コメント
  comment: string
  // 送信日時
  send_time: string
}
// Chat型初期化オブジェクト
export function GetObj_Chat() {
  const obj: Chat = {
    id: 0,
    actor_user_id: 0,
    maker_user_id: 0,
    sender_dir: 0,
    comment: '',
    send_time: '',
  }
  return obj
}

// Chat型とUser, MakerUser型のセット
export type ChatWithUser = {
  chat: Chat
  actor: User
  maker: MakerUser
}

// ChatWithUser型初期化オブジェクト
export function GetObj_ChatWithUser() {
  const obj: ChatWithUser = {
    chat: GetObj_Chat(),
    actor: GetObj_User(),
    maker: GetObj_MakerUser(),
  }
  return obj
}

// ChatWithUser型ダミーオブジェクト
export function GetDummyObj_ChatWithUser(
  comment: string, sendTime: string,
  sendDir: SendDirection,
  actorName: string, actorProfileImagePath: string,
  makerName: string, makerProfileImagePath: string
) {
  const obj: ChatWithUser = {
    chat: GetObj_Chat(),
    actor: GetObj_User(),
    maker: GetObj_MakerUser(),
  }

  obj.chat.comment = comment
  obj.chat.send_time = sendTime
  obj.chat.sender_dir = sendDir
  obj.actor.user_name = actorName
  obj.actor.image_path = actorProfileImagePath
  obj.maker.maker_name = makerName
  obj.maker.image_path = makerProfileImagePath

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
