import Box from '@mui/material/Box'
import Checkbox from '@mui/material/Checkbox'
import FormControl from '@mui/material/FormControl'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormGroup from '@mui/material/FormGroup'
import FormHelperText from '@mui/material/FormHelperText'
import FormLabel from '@mui/material/FormLabel'
import Paper from '@mui/material/Paper'
import Grid from '@mui/material/Unstable_Grid2'
import { styled } from '@mui/material/styles'
import * as React from 'react'
import Flex from 'components/layout/Flex'
import {
  BoolWithInt,
  GetObj_PlayCondition,
  PlayCondition,
  PlayConditionChoice,
} from 'types/userTypes'

// 条件リスト
type Condition = {
  label: string
  id: string
}

const ConditionList: Condition[] = [
  { label: '本番', id: 'honban' },
  { label: 'ゴム無し', id: 'gomunashi' },
  { label: '中出し', id: 'nakadashi' },
  { label: 'フェラチオ', id: 'ferachio' },
  { label: 'イラマチオ', id: 'iramachio' },
  { label: '口内発射', id: 'kounaihassha' },
  { label: '顔射', id: 'gansha' },
  { label: 'ごっくん', id: 'gokkun' },
  { label: 'ぶっかけ', id: 'bukkake' },
  { label: 'アナル', id: 'anal' },
  { label: 'アナル(指)', id: 'anal_finger' },
  { label: 'アナル(おもちゃ)', id: 'anal_toy' },
  { label: 'アナル(男根)', id: 'anal_dankon' },
  { label: 'おもちゃ', id: 'toys' },
  { label: 'ローター', id: 'rotar' },
  { label: '電マ', id: 'denma' },
  { label: 'バイブ', id: 'vibe' },
  { label: 'マシンバイブ', id: 'machine_vibe' },
  { label: '痴女', id: 'chizyo' },
  { label: '露出', id: 'roshutsu' },
  { label: '外泊ロケ', id: 'gaihakuroke' },
  { label: '外国人', id: 'gaikokujin' },
  { label: 'レズ(タチ)', id: 'les_tachi' },
  { label: 'レズ(ネコ)', id: 'les_neko' },
  { label: '複数プレイ', id: 'multiplay' },
  { label: 'オナニー', id: 'onani' },
  { label: '剃毛', id: 'teimou' },
  { label: '放尿', id: 'hounyou' },
  { label: '飲尿', id: 'innyou' },
  { label: '浴尿', id: 'yokunyou' },
  { label: '飲尿・浴尿(疑似)', id: 'giji_innyou' },
  { label: 'レイプ', id: 'rape' },
  { label: 'レイプ(ハード)', id: 'rape_head' },
  { label: 'SM', id: 'sm' },
  { label: 'スパンキング', id: 'spamking' },
  { label: 'ムチ(バラムチ)', id: 'bara_muchi' },
  { label: 'ムチ(１本ムチ)', id: 'ippon_muchi' },
  { label: 'ろうそく', id: 'rousoku' },
  { label: '緊縛', id: 'kinbaku' },
  { label: '鼻フック', id: 'hanahukku' },
  { label: '浣腸', id: 'kanchou' },
  { label: 'ビンタ', id: 'binta' },
  { label: '首しめ', id: 'kubisime' },
  { label: 'フィスト', id: 'fist' },
  { label: 'ダンス', id: 'dance' },
]

interface PlayConditionListProps {
  conditions: PlayCondition
}

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(0.5),
  textAlign: 'start',
  color: theme.palette.text.primary,
}))

export default function PlayConditionList(props: PlayConditionListProps) {
  return (
    <Box>
      <FormControl sx={{ m: 3 }} component="fieldset" variant="standard">
        <FormGroup row>
          <Flex
            flexDirection={'row'}
            flexWrap={'wrap'}
            justifyContent={'flex-start'}
            alignContent={'flex-start'}
            alignItems={'flex-start'}
          >
            {Object.entries(props.conditions).map((pair) => {
              if (
                pair[0] == 'id' ||
                pair[0] == 'user_id' ||
                pair[0] == 'created_at' ||
                pair[0] == 'updated_at'
              ) {
                return
              }
              return (
                <Box key={pair[0]} minWidth={'180px'} margin={1}>
                  <Item>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={
                            pair[1] == PlayConditionChoice.OK ? true : false
                          }
                          name={pair[0]}
                        />
                      }
                      label={
                        ConditionList.find((item) => item.id == pair[0])?.label
                      }
                    />
                  </Item>
                </Box>
              )
            })}
          </Flex>
        </FormGroup>
      </FormControl>
    </Box>
  )
}
