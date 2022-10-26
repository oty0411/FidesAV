import type { NextPage } from 'next'
import React from 'react'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import FullCalendar, { DateSelectArg, EventClickArg } from '@fullcalendar/react'
import allLocales from '@fullcalendar/core/locales-all'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import listPlugin from '@fullcalendar/list'
import interactionPlugin from '@fullcalendar/interaction'
import { useRouter } from 'next/router'
import Separator from 'components/atoms/Separator'
import Box from 'components/layout/Box'
import Layout from 'components/templates/Layout'
import MainPartLayout from 'components/templates/Layout/mainPartLayout'
import { useAuthContext } from 'contexts/AuthContext'
import {
  ActorSchedule,
  ApiContext,
  AppErrorCode,
  GetObj_ActorSchedule,
  LoginUserType,
  RecruitingStatus,
} from 'types/userTypes'
import { GetScheduleList, PostSchedule, DeleteSchedule } from 'api/schedule'

const ActorSchedulePage: NextPage = () => {
  // #region Fields
  const apiContext: ApiContext = {
    apiRootUrl: process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost/api',
  }
  // ページルート
  const router = useRouter()
  // 認証済ユーザー
  const { authUser } = useAuthContext()
  // 女優ID
  const actor_id = Number(router.query.id)
  // スケジュールイベントリスト
  const [actorSchedules, setActorSchedules] = React.useState<ActorSchedule[]>(
    [],
  )
  // #endregion Fields

  // #region Functions
  // 初期化処理
  React.useEffect(() => {
    // 既存イベントリスト取得
    GetScheduleList(apiContext, actor_id).then((apiResult) => {
      console.log(apiResult)
      if (apiResult.result.Code == AppErrorCode.Success) {
        setActorSchedules(apiResult.data)
        console.log(actorSchedules)
      }
    })
  }, [])

  // #region Add Event Controls
  const [addEventSelectRange, setAddEventSelectRange] =
    React.useState<DateSelectArg>()
  // イベント登録時に必要な情報を一時保存するステート
  const [addEventStart, setAddEventStart] = React.useState('')
  const [addEventEnd, setAddEventEnd] = React.useState('')

  // カレンダー日付選択時イベントハンドラ
  const handleDateSelect = (selectionInfo: DateSelectArg) => {
    // ユーザータイプチェック(メーカーユーザーは選択操作してもスケジュール変更させない)
    if (authUser.type == LoginUserType.Marker) {
      return
    }

    console.log('selectionInfo: ', selectionInfo)
    // 選択範囲を一時保存
    setAddEventSelectRange(selectionInfo)
    setAddEventStart(new Date(selectionInfo.start).toLocaleString())
    setAddEventEnd(new Date(selectionInfo.end).toLocaleString())

    // ダイアログオープン
    setAddEventDialogOpen(true)

    // 選択した部分の選択を解除
    const calendarApi = selectionInfo.view.calendar
    calendarApi.unselect()
  }

  // イベント追加時のダイアログオープンフラグ
  const [addEventDialogOpen, setAddEventDialogOpen] = React.useState(false)
  // ダイアログで登録を選択したときのイベントハンドラ
  const handleAddEvent = () => {
    // 新規イベント追加
    const scheduleData = GetObj_ActorSchedule()
    scheduleData.actor_user_id = actor_id
    scheduleData.maker_user_id = 1
    scheduleData.start_time = addEventStart
    scheduleData.end_time = addEventEnd
    scheduleData.recruiting = RecruitingStatus.Going
    PostSchedule(apiContext, scheduleData).then((apiResult) => {
      // console.log(apiResult);
      if (apiResult.result.Code == AppErrorCode.Success) {
        // 既存イベントリスト更新
        GetScheduleList(apiContext, actor_id).then((apiResult) => {
          console.log(apiResult)
          if (apiResult.result.Code == AppErrorCode.Success) {
            setActorSchedules(apiResult.data)
          }
        })
      }
    })

    setAddEventDialogOpen(false)
  }
  // ダイアログで中止を選択したときのイベントハンドラ
  const handleAddEventDialogClose = () => {
    setAddEventDialogOpen(false)
  }
  // #endregion Add Event Controls

  // #region Edit Event Controls
  const [opeEventForActorDialogOpen, setOpeEventForActorDialogOpen] =
    React.useState(false)
  const [opeEventForMakerDialogOpen, setOpeEventForMakerDialogOpen] =
    React.useState(false)
  const [opeEventArg, setOpeEventArg] = React.useState<EventClickArg>()
  // 追加済イベントクリック時イベントハンドラ
  const handleEventClick = (eventInfo: EventClickArg) => {
    // console.log('eventInfo: ', eventInfo)
    // console.log('id: ', eventInfo.event.id)
    // console.log('title: ', eventInfo.event.title)
    // console.log('start: ', eventInfo.event.start)
    // console.log('end: ', eventInfo.event.end)

    // イベント情報のバックアップ
    setOpeEventArg(eventInfo)

    // ユーザータイプに従い表示するダイアログを切替
    if (authUser.type == LoginUserType.Marker) {
      // メーカー向け
      setOpeEventForMakerDialogOpen(true)
    } else {
      // 女優向け
      setOpeEventForActorDialogOpen(true)
    }
  }

  // ダイアログで”出演依頼へ進む”を選択したときのイベントハンドラ
  const handleGoToAppearanceRequest = () => {
    // 選択イベントの情報
    //console.log(opeEventArg)

    setOpeEventForMakerDialogOpen(false)

    // 出演依頼ページへ遷移
    router.push(`/message/appearancerequest?targetId=${opeEventArg?.event.id}`)
  }
  // ダイアログで"削除"を選択したときのイベントハンドラ
  const handleDeleteEvent = () => {
    // イベント削除の確認
    if (!confirm('本当にイベントを削除しますか?')) {
      setOpeEventForActorDialogOpen(false)
      return
    }

    // イベント削除
    const deleteTargetIndex = Number(opeEventArg?.event.id)
    DeleteSchedule(apiContext, deleteTargetIndex).then((apiResult) => {
      console.log(apiResult)
      if (apiResult.result.Code == AppErrorCode.Success) {
        // // 画面上のイベント削除
        // opeEventArg?.event.remove()
        // ローカル上のリストからイベント削除
        const deleteTargetIndex = actorSchedules.findIndex(
          (item) => item.id == deleteTargetIndex,
        )
        console.log('before', actorSchedules)
        actorSchedules.splice(deleteTargetIndex, 1)
        setActorSchedules([...actorSchedules])
        console.log('after', actorSchedules)
      }
    })

    setOpeEventForActorDialogOpen(false)
  }
  // ダイアログで"中止"を選択したときのイベントハンドラ
  const handleOpeEventDialogClose = () => {
    setOpeEventForActorDialogOpen(false)
    setOpeEventForMakerDialogOpen(false)
  }
  // #endregion Edit Event Controls
  // #endregion Functions

  // #region View
  return (
    <Layout userType={authUser.type == LoginUserType.Actor ? 'actor' : 'maker'}>
      <MainPartLayout>
        <Separator />
        <Box marginLeft={2} backgroundColor={'white'}>
          <FullCalendar
            plugins={[
              dayGridPlugin,
              timeGridPlugin,
              interactionPlugin,
              listPlugin,
            ]}
            initialView="dayGridMonth"
            locales={allLocales}
            locale="ja"
            events={actorSchedules.map((item) => {
              return {
                id: String(item.id),
                title: item.maker_user_id != 1 ? '契約済撮影日' : '撮影可能',
                start: new Date(item.start_time).toISOString(),
                end: new Date(item.end_time).toISOString(),
                allDay: false,
              }
            })}
            //events={'https://fullcalendar.io/api/demo-feeds/events.json'}
            // 日付クリックイベント
            // イベント追加するだけであれば選択イベントの方が扱いやすいため無効化
            //dateClick={handleDateClick}
            // 日付範囲を選択可能にする
            selectable={true}
            select={handleDateSelect}
            eventClick={handleEventClick}
            headerToolbar={{
              start: 'prev,next today',
              center: 'title',
              right: 'dayGridMonth,timeGridWeek,timeGridDay',
            }}
            businessHours={{
              daysOfWeek: [0, 1, 2, 3, 4, 5, 6],
              startTime: '7:00',
              endTime: '23:00',
            }}
            nowIndicator={true}
            selectMirror={true}
            weekNumbers={true}
            weekNumberFormat={{ week: 'numeric' }}
            navLinks={true}
            dayMaxEvents={2}
          />
        </Box>
        {/* イベント追加用ダイアログ */}
        <Dialog open={addEventDialogOpen} onClose={handleAddEventDialogClose}>
          <DialogTitle>予定追加</DialogTitle>
          <DialogContent>
            <DialogContentText>日時を指定</DialogContentText>
            <TextField
              value={new Date(addEventStart).toLocaleString()}
              onChange={(event) => setAddEventStart(event.target.value)}
              autoFocus
              margin="dense"
              id="name"
              label="開始日時"
              // type="email"
              fullWidth
              variant="standard"
            />
            <TextField
              value={new Date(addEventEnd).toLocaleString()}
              onChange={(event) => setAddEventEnd(event.target.value)}
              autoFocus
              margin="dense"
              id="name"
              label="終了日時"
              // type="email"
              fullWidth
              variant="standard"
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleAddEvent}>登録</Button>
            <Button onClick={handleAddEventDialogClose}>キャンセル</Button>
          </DialogActions>
        </Dialog>
        {/* イベント操作用ダイアログ(女優用) */}
        <Dialog
          open={opeEventForActorDialogOpen}
          onClose={handleOpeEventDialogClose}
        >
          <DialogTitle>イベント操作</DialogTitle>
          <DialogContent>
            <DialogContentText>
              イベントに対する操作を選択してください
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleDeleteEvent}>削除</Button>
            <Button onClick={handleOpeEventDialogClose}>キャンセル</Button>
          </DialogActions>
        </Dialog>
        {/* イベント操作用ダイアログ(メーカー用) */}
        <Dialog
          open={opeEventForMakerDialogOpen}
          onClose={handleOpeEventDialogClose}
        >
          <DialogTitle>イベント操作</DialogTitle>
          <DialogContent>
            <DialogContentText>
              イベントに対する操作を選択してください
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleGoToAppearanceRequest}>
              出演依頼へ進む
            </Button>
            <Button onClick={handleOpeEventDialogClose}>キャンセル</Button>
          </DialogActions>
        </Dialog>
      </MainPartLayout>
    </Layout>
  )
  // #endregion View
}

export default ActorSchedulePage
