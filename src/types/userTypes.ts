// #region Error code

import { stringify } from 'querystring'

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
  Unknown = 0,
  A = 1,
  B = 2,
  O = 3,
  AB = 4,
}

/**
 * 血液型(文字列)
 */
export enum BloodTypeString {
  Unknown = '不定',
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
  } else if (status == BloodType.AB) {
    return BloodTypeString.AB
  } else {
    return BloodTypeString.Unknown
  }
}

/**
 * 洋服サイズ
 */
export enum ClothesSizeType {
  Unknown = 0,
  SS = 1,
  S = 2,
  M = 3,
  L = 4,
  L2 = 5,
  L3 = 6,
  L4 = 7,
  L5 = 8,
  L6 = 9,
  L7 = 10,
  L8 = 11,
  L9 = 12,
  L10 = 13,
}

/**
 * 洋服サイズ(文字列)
 */
export const ClothesSizeTypeString = {
  '0': 'Unknown',
  '1': 'SS',
  '2': 'S',
  '3': 'M',
  '4': 'L',
  '5': '2L',
  '6': '3L',
  '7': '4L',
  '8': '5L',
  '9': '6L',
  '10': '7L',
  '11': '8L',
  '12': '9L',
  '13': '10L',
}

// 数値の文字列化
export function ConvertToStringClothesSizeType(status: number) {
  // TODO：if使わずにスマートに書き換えたい
  return ClothesSizeTypeString[String(status)]
}

/**
 * バストサイズ
 */
export enum BreastSizeType {
  Unknown = 0,
  A = 1,
  B = 2,
  C = 3,
  D = 4,
  E = 5,
  F = 6,
  G = 7,
  H = 8,
  I = 9,
  J = 10,
  K = 11,
  L = 12,
  M = 13,
  N = 14,
}
/**
 * バストサイズ(文字列)
 */
export const BreastSizeTypeString = {
  '0': 'Unknown',
  '1': 'A',
  '2': 'B',
  '3': 'C',
  '4': 'D',
  '5': 'E',
  '6': 'F',
  '7': 'G',
  '8': 'H',
  '9': 'I',
  '10': 'J',
  '11': 'K',
  '12': 'L',
  '13': 'M',
  '14': 'N',
}

// 数値の文字列化
export function ConvertToStringBreastSize(status: number) {
  // TODO：if使わずにスマートに書き換えたい
  return BreastSizeTypeString[String(status)]
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
  blood_type: BloodType
  // 身長
  height: number
  // 体重
  weight: number
  // 服サイズ
  clothes_size: ClothesSizeType
  // 靴サイズ
  shoes_size: number
  // バストサイズ
  breast_size: BreastSizeType
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

/**
 * プレイ条件選択肢
 */
export enum PlayConditionChoice {
  Unknown = 0,
  OK = 1,
  NG = 2,
  NEGOTIABLE = 3,
}

// プレイ条件
export type PlayCondition = {
  // ユーザーID
  id: number
  // ユーザーID
  user_id: number
  // 本番
  honban: PlayConditionChoice
  // ゴム無
  gomunashi: PlayConditionChoice
  // 中出し
  nakadashi: PlayConditionChoice
  // フェラチオ
  ferachio: PlayConditionChoice
  // イマラチオ
  iramachio: PlayConditionChoice
  // 口内発射
  kounaihassha: PlayConditionChoice
  // 顔射
  gansha: PlayConditionChoice
  // ごっくん
  gokkun: PlayConditionChoice
  // ぶっかけ
  bukkake: PlayConditionChoice
  // アナル
  anal: PlayConditionChoice
  // アナル(指)
  anal_finger: PlayConditionChoice
  // アナル(おもちゃ)
  anal_toy: PlayConditionChoice
  // アナル(男根)
  anal_dankon: PlayConditionChoice
  // おもちゃ
  toys: PlayConditionChoice
  // ローター
  rotar: PlayConditionChoice
  // 電マ
  denma: PlayConditionChoice
  // バイブ
  vibe: PlayConditionChoice
  // マシンバイブ
  machine_vibe: PlayConditionChoice
  // 痴女
  chizyo: PlayConditionChoice
  // 露出
  roshutsu: PlayConditionChoice
  // 外泊ロケ
  gaihakuroke: PlayConditionChoice
  // 外国人
  gaikokujin: PlayConditionChoice
  // レズ(タチ)
  les_tachi: PlayConditionChoice
  // レズ(ネコ)
  les_neko: PlayConditionChoice
  // 複数プレイ
  multiplay: PlayConditionChoice
  // オナニー
  onani: PlayConditionChoice
  // 剃毛
  teimou: PlayConditionChoice
  // 放尿
  hounyou: PlayConditionChoice
  // 飲尿
  innyou: PlayConditionChoice
  // 浴尿
  yokunyou: PlayConditionChoice
  // 飲尿・浴尿（擬似）
  giji_innyou: PlayConditionChoice
  // レイプ
  rape: PlayConditionChoice
  // レイプ（ハード）
  rape_head: PlayConditionChoice
  // SM
  sm: PlayConditionChoice
  // スパンキング
  spamking: PlayConditionChoice
  // ムチ（バラムチ）
  bara_muchi: PlayConditionChoice
  // ムチ（１本ムチ）
  ippon_muchi: PlayConditionChoice
  // ろうそく
  rousoku: PlayConditionChoice
  // 緊縛
  kinbaku: PlayConditionChoice
  // 鼻フック
  hanahukku: PlayConditionChoice
  // 浣腸
  kanchou: PlayConditionChoice
  // ビンタ
  binta: PlayConditionChoice
  // 首しめ
  kubisime: PlayConditionChoice
  // フィスト
  fist: PlayConditionChoice
  // ダンス
  dance: PlayConditionChoice
}
// PlayCondition型初期化オブジェクト
export function GetObj_PlayCondition() {
  const obj: PlayCondition = {
    id: 0,
    user_id: 0,
    // 本番
    honban: PlayConditionChoice.NG,
    // ゴム無
    gomunashi: PlayConditionChoice.NG,
    // 中出し
    nakadashi: PlayConditionChoice.NG,
    // フェラチオ
    ferachio: PlayConditionChoice.NG,
    // イマラチオ
    iramachio: PlayConditionChoice.NG,
    // 口内発射
    kounaihassha: PlayConditionChoice.NG,
    // 顔射
    gansha: PlayConditionChoice.NG,
    // ごっくん
    gokkun: PlayConditionChoice.NG,
    // ぶっかけ
    bukkake: PlayConditionChoice.NG,
    // アナル
    anal: PlayConditionChoice.NG,
    // アナル(指)
    anal_finger: PlayConditionChoice.NG,
    // アナル(おもちゃ)
    anal_toy: PlayConditionChoice.NG,
    // アナル(男根)
    anal_dankon: PlayConditionChoice.NG,
    // おもちゃ
    toys: PlayConditionChoice.NG,
    // ローター
    rotar: PlayConditionChoice.NG,
    // 電マ
    denma: PlayConditionChoice.NG,
    // バイブ
    vibe: PlayConditionChoice.NG,
    // マシンバイブ
    machine_vibe: PlayConditionChoice.NG,
    // 痴女
    chizyo: PlayConditionChoice.NG,
    // 露出
    roshutsu: PlayConditionChoice.NG,
    // 外泊ロケ
    gaihakuroke: PlayConditionChoice.NG,
    // 外国人
    gaikokujin: PlayConditionChoice.NG,
    // レズ(タチ)
    les_tachi: PlayConditionChoice.NG,
    // レズ(ネコ)
    les_neko: PlayConditionChoice.NG,
    // 複数プレイ
    multiplay: PlayConditionChoice.NG,
    // オナニー
    onani: PlayConditionChoice.NG,
    // 剃毛
    teimou: PlayConditionChoice.NG,
    // 放尿
    hounyou: PlayConditionChoice.NG,
    // 飲尿
    innyou: PlayConditionChoice.NG,
    // 浴尿
    yokunyou: PlayConditionChoice.NG,
    // 飲尿・浴尿（擬似）
    giji_innyou: PlayConditionChoice.NG,
    // レイプ
    rape: PlayConditionChoice.NG,
    // レイプ（ハード）
    rape_head: PlayConditionChoice.NG,
    // SM
    sm: PlayConditionChoice.NG,
    // スパンキング
    spamking: PlayConditionChoice.NG,
    // ムチ（バラムチ）
    bara_muchi: PlayConditionChoice.NG,
    // ムチ（１本ムチ）
    ippon_muchi: PlayConditionChoice.NG,
    // ろうそく
    rousoku: PlayConditionChoice.NG,
    // 緊縛
    kinbaku: PlayConditionChoice.NG,
    // 鼻フック
    hanahukku: PlayConditionChoice.NG,
    // 浣腸
    kanchou: PlayConditionChoice.NG,
    // ビンタ
    binta: PlayConditionChoice.NG,
    // 首しめ
    kubisime: PlayConditionChoice.NG,
    // フィスト
    fist: PlayConditionChoice.NG,
    // ダンス
    dance: PlayConditionChoice.NG,
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
  comment: string,
  sendTime: string,
  sendDir: SendDirection,
  actorName: string,
  actorProfileImagePath: string,
  makerName: string,
  makerProfileImagePath: string,
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

// 募集状態
export enum RecruitingStatus {
  // 不定
  Unknown = 0,
  // 募集中
  Going = 1,
  // 募集終了
  Finish = 2,
}

// 女優スケジュール
export type ActorSchedule = {
  // ID
  id: number
  // ユーザーID(女優)
  actor_user_id: number
  // ユーザーID(メーカー)
  maker_user_id: number
  // 開始時刻
  start_time: string
  // 終了時刻
  end_time: string
  // 募集中
  recruiting: RecruitingStatus
}

// ActorSchedule型初期化オブジェクト
export function GetObj_ActorSchedule() {
  const obj: ActorSchedule = {
    id: 0,
    actor_user_id: 0,
    maker_user_id: 0,
    start_time: '',
    end_time: '',
    recruiting: RecruitingStatus.Unknown,
  }
  return obj
}

// 出演オファー状態
export enum OfferStatus {
  // 不定
  Unknown = 0,
  // オファー中
  Going = 1,
  // 終了
  Finish = 2,
}

// 出演依頼
export type Offer = {
  // ID
  id: number
  // スケジュールID(女優)
  actor_schedule_id: number
  // ユーザーID(メーカー)
  maker_user_id: number
  // オファー状態
  status: OfferStatus
  // 出演料
  fee: number
  // タイトル
  title: string
  // 企画概要
  summary: string
  // 撮影日時
  date_time: string
  // 撮影場所
  place: string
  // メイク付
  makeup: BoolWithInt
  // 貸衣裳
  rental_costume: BoolWithInt
  // 控室(個室)
  private_room: BoolWithInt
  // 控室(相部屋)
  shared_room: BoolWithInt
  // 送迎
  pick_up: BoolWithInt
  // 食事
  meal: BoolWithInt
  // メッセージ
  message: string
}

// Offer型初期化オブジェクト
export function GetObj_Offer() {
  const obj: Offer = {
    id: 0,
    actor_schedule_id: 0,
    maker_user_id: 0,
    status: OfferStatus.Unknown,
    fee: 0,
    title: '',
    summary: '',
    date_time: '',
    place: '',
    makeup: BoolWithInt.Unknown,
    // 貸衣裳
    rental_costume: BoolWithInt.Unknown,
    // 控室(個室)
    private_room: BoolWithInt.Unknown,
    // 控室(相部屋)
    shared_room: BoolWithInt.Unknown,
    // 送迎
    pick_up: BoolWithInt.Unknown,
    // 食事
    meal: BoolWithInt.Unknown,
    // メッセージ
    message: '',
  }
  return obj
}

// 出演依頼データ(オプションデータ付)
export class OfferWithOptionData {
  // 出演依頼
  public offer: Offer
  // 出演依頼を出した対象の女優スケジュール
  public schedule: ActorSchedule
  // 出演依頼を出したメーカー
  public maker_user: MakerUser

  constructor() {
    this.offer = GetObj_Offer()
    this.schedule = GetObj_ActorSchedule()
    this.maker_user = GetObj_MakerUser()
  }
}

// 出演オファーレスポンス
export enum OfferResponseType {
  // 不定
  Unknown = 0,
  // 契約
  Agreement = 1,
  // 未契約
  NoContract = 2,
}

// 出演依頼レスポンス
export type OfferResponse = {
  // ID
  id: number
  // 出演依頼ID
  offer_id: number
  // レスポンス
  response: OfferResponseType
  // メッセージ
  message: string
}

// OfferResponse型初期化オブジェクト
export function GetObj_OfferResponse() {
  const obj: OfferResponse = {
    id: 0,
    offer_id: 0,
    response: OfferResponseType.Unknown,
    message: '',
  }
  return obj
}

// 出演依頼レスポンスデータ(オプションデータ付)
export class OfferResponseWithOptionData {
  // 出演依頼レスポンス
  public offer_response: OfferResponse
  // 出演依頼
  public offer: Offer

  constructor() {
    this.offer_response = GetObj_OfferResponse()
    this.offer = GetObj_Offer()
  }
}

// ユーザー評価タイプ
export enum UserEvaluationType {
  // 不定
  Unknown = 0,
  // Good
  Good = 1,
  // Normal
  Normal = 2,
  // Bad
  Bad = 3,
}

// ユーザー評価
export type Evaluation = {
  // ID
  id: number
  // ユーザーID(女優)
  actor_user_id: number
  // ユーザーID(メーカー)
  maker_user_id: number
  // 送信方法
  sender_dir: SendDirection
  // 評価
  evaluation: UserEvaluationType
  // 評価コメント
  comment: string
}

// Evaluation型初期化オブジェクト
export function GetObj_Evaluation() {
  const obj: Evaluation = {
    id: 0,
    actor_user_id: 0,
    maker_user_id: 0,
    sender_dir: SendDirection.Unknown,
    evaluation: UserEvaluationType.Unknown,
    comment: '',
  }
  return obj
}

// 違反行為通報
export type ViolationReport = {
  // ID
  id: number
  // ユーザーID(女優)
  actor_user_id: number
  // ユーザーID(メーカー)
  maker_user_id: number
  // 送信方法
  sender_dir: SendDirection
  // 契約違反
  breach_contract: BoolWithInt
  // 引き抜き交渉
  withdrawal_negotiation: BoolWithInt
  // 営業妨害
  business_interruption: BoolWithInt
  // 迷惑行為
  nuisance: BoolWithInt
  // その他
  other: BoolWithInt
  // 違反行為の説明
  explanation_text: string
}

// ViolationReport型初期化オブジェクト
export function GetObj_ViolationReport() {
  const obj: ViolationReport = {
    id: 0,
    actor_user_id: 0,
    maker_user_id: 0,
    sender_dir: SendDirection.Unknown,
    breach_contract: BoolWithInt.Unknown,
    withdrawal_negotiation: BoolWithInt.Unknown,
    business_interruption: BoolWithInt.Unknown,
    nuisance: BoolWithInt.Unknown,
    other: BoolWithInt.Unknown,
    explanation_text: '',
  }
  return obj
}

// ユーザー通知
export enum UserNoticeType {
  // 不定
  Unknown = 0,
  // 通知
  Notice = 1,
  // お知らせ
  News = 2,
}

// 既読ステータス
export enum AlreadyReadStatus {
  // 不定
  Unknown = 0,
  // 未読
  False = 1,
  // 既読
  True = 2,
}

// 通知カテゴリ
export enum NoticeCategory {
  // 不定
  Unknown = 0,
  // 未読
  Normal = 1,
  // 出演依頼
  AppearanceRequest = 2,
  // 出演依頼
  AppearanceRequestResponse = 3,
  // 取引完了
  TransactionCompleted = 4,
}

// ユーザー通知
export type UserNotice = {
  // ID
  id: number
  // ユーザータイプ
  user_type: LoginUserType
  // ユーザーID
  user_id: number
  // 通知タイプ
  type: UserNoticeType
  // 既読
  already_read: AlreadyReadStatus
  // カテゴリ
  category: NoticeCategory
  // 情報ID
  information_id: number
  // タイトル
  title: string
  // サブタイトル
  sub_title: string
}
// UserNotice型初期化オブジェクト
export function GetObj_UserNotice() {
  const obj: UserNotice = {
    id: 0,
    user_type: LoginUserType.Unknown,
    user_id: 0,
    type: UserNoticeType.Unknown,
    already_read: AlreadyReadStatus.Unknown,
    category: NoticeCategory.Unknown,
    information_id: 0,
    title: '',
    sub_title: '',
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
