import type { NextPage } from 'next'
import React, { useState, useEffect, useCallback } from 'react'
import FullCalendar, { DateSelectArg } from '@fullcalendar/react'
import allLocales from '@fullcalendar/core/locales-all'
import jaLocale from '@fullcalendar/core/locales/ja'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import listPlugin from '@fullcalendar/list'
import interactionPlugin, { DateClickArg } from '@fullcalendar/interaction'
import { useRouter } from 'next/router'
import Separator from 'components/atoms/Separator'
import Box from 'components/layout/Box'
import Flex from 'components/layout/Flex'
import Layout from 'components/templates/Layout'
import MainPartLayout from 'components/templates/Layout/mainPartLayout'
import { useAuthContext } from 'contexts/AuthContext'
import { ApiContext, AppErrorCode, User } from 'types/userTypes'

const ActorSchedulePage: NextPage = () => {
  // #region Fields
  // const apiContext: ApiContext = {
  //   apiRootUrl: process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost/api',
  // }
  // ページルート
  // const router = useRouter()
  // // 認証済ユーザー
  // const { authUser, setAuthUser } = useAuthContext()
  // #endregion Fields

  // #region Functions
  // 初期化処理
  // useEffect(() => {
  //   /*do nothing*/
  // }, [])
  // カレンダー日付クリック時イベントハンドラ
  const handleDateClick = useCallback((arg: DateClickArg) => {
    alert(arg.dateStr)
  }, [])
  // カレンダー日付選択時イベントハンドラ
  const handleDateSelect = (selectionInfo: DateSelectArg) => {
    console.log('selectionInfo: ', selectionInfo) // 選択した範囲の情報をconsoleに出力
    const calendarApi = selectionInfo.view.calendar

    calendarApi.unselect() // 選択した部分の選択を解除
  }
  // #endregion Functions

  // #region View
  return (
    <Layout>
      <MainPartLayout>
        <Separator />
        <Box marginLeft={2}>
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
            initialEvents={[{ title: 'initial event', start: new Date() }]}
            //events={'https://fullcalendar.io/api/demo-feeds/events.json'}
            dateClick={handleDateClick}
            select={handleDateSelect}
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
            selectable={true}
            selectMirror={true}
            weekNumbers={true}
            weekNumberFormat={{ week: 'numeric' }}
            navLinks={true}
            dayMaxEvents={2}
          />
        </Box>
      </MainPartLayout>
    </Layout>
  )
  // #endregion View
}

export default ActorSchedulePage
