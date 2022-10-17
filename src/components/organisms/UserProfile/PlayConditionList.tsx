import * as React from 'react';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2'
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormHelperText from '@mui/material/FormHelperText';
import Checkbox from '@mui/material/Checkbox';
import Flex from 'components/layout/Flex';

// 条件リスト
type Condition = {
  label: string
  id: string
}

const conditionList: Condition[] = [
	{ label: '足コキ', id: 'ashikoki' },
	{ label: '汗だく', id: 'asedaku' },
	{ label: 'アナル', id: 'anaru' },
	{ label: 'アナルセックス', id: 'anarusex' },
	{ label: '異物挿入', id: 'ibutsusounyu' },
	{ label: 'イラマチオ', id: 'iramachio' },
	{ label: '淫語', id: 'inngo' },
	{ label: '放尿', id: 'hounyo' },
	{ label: '男の潮吹き', id: 'otokonoshiohuki' },
	{ label: 'オナニー', id: 'onani' },
	{ label: 'おもちゃ', id: 'omocha' },
	{ label: '監禁', id: 'kannkin' },
	{ label: '浣腸', id: 'kanncho' },
	{ label: '顔射', id: 'gannsha' },
	{ label: '顔面騎乗', id: 'gannmenkijyo' },
	{ label: '騎乗位', id: 'kijyoui' },
	{ label: 'キス・接吻', id: 'kisuseppunn' },
	{ label: '鬼畜', id: 'kichiku' },
	{ label: 'くすぐり', id: 'kusuguri' },
	{ label: 'クスコ', id: 'kusuko' },
	{ label: 'クンニ', id: 'kunnni' },
	{ label: 'ゲロ', id: 'gero' },
	{ label: '拘束', id: 'kousoku' },
	{ label: '拷問', id: 'goumonn' },
	{ label: 'ごっくん', id: 'gokkunn' },
	{ label: '潮吹き', id: 'shiohuki' },
	{ label: 'シックスナイン', id: 'shikkusunainn' },
	{ label: '縛り・緊縛', id: 'sibari' },
	{ label: '羞恥', id: 'syuchi' },
	{ label: '触手', id: 'syokusyu' },
	{ label: '食糞', id: 'syokuhunn' },
	{ label: 'スカトロ', id: 'sukatoro' },
	{ label: 'スパンキング', id: 'supannkinngu' },
	{ label: '即ハメ', id: 'sokuhame' },
	{ label: '脱糞', id: 'dappunn' },
	{ label: '手コキ', id: 'tekoki' },
	{ label: 'ディルド', id: 'dhirudo' },
	{ label: '電マ', id: 'dennma' },
	{ label: 'ドラッグ', id: 'doraggu' },
	{ label: '中出し', id: 'nakadashi' },
	{ label: '辱め', id: 'hazukasime' },
	{ label: '鼻フック', id: 'hanahukku' },
	{ label: 'ハメ撮り', id: 'hamedori' },
	{ label: '孕ませ', id: 'haramase' },
	{ label: 'バイブ', id: 'baibu' },
	{ label: 'バック', id: 'bakku' },
	{ label: '罵倒', id: 'batou' },
	{ label: 'パイズリ', id: 'paizuri' },
	{ label: 'フィスト', id: 'fisuto' },
	{ label: 'フェラ', id: 'fera' },
	{ label: 'ぶっかけ', id: 'bukkake' },
	{ label: '放置', id: 'houchi' },
	{ label: '放尿・お漏らし', id: 'hounyou' },
	{ label: '母乳', id: 'bonyuu' },
	{ label: 'ポルチオ', id: 'poruchio' },
	{ label: '指マン', id: 'yubimann' },
	{ label: 'ラブコメ', id: 'rabukome' },
	{ label: 'レズキス', id: 'rezukisu' },
	{ label: 'ローション・オイル', id: 'ro-syon' },
	{ label: 'ローター', id: 'rota' },
	{ label: '蝋燭', id: 'rousoku' },
	{ label: '3P・4P', id: 'ThreeP' },
]

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(0.5),
  textAlign: 'start',
  color: theme.palette.text.primary,
}));

export default function PlayConditionList() {
	const [state, setState] = React.useState(
		conditionList.map(item => {
			return ({
				id: item.id
			})
		})
	);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setState({
      ...state,
      [event.target.name]: event.target.checked,
    });
  };

  return (
		<Box sx={{ display: 'flex', width: 1000}}>
			<Grid container spacing={2} columns={10}>
				<FormControl sx={{ m: 3}} component="fieldset" variant="standard"></FormControl>
				<Grid xs={12}>
					<FormGroup row>
						{conditionList.map(item => {
							return (
							<Grid xs={2}>
									<Item>
										<FormControlLabel
											control={
												<Checkbox /*checked={gilad}*/ onChange={handleChange} name={item.id} />
											}
											label={item.label}
										/>
									</Item>
								</Grid>
							)
						})}
						</FormGroup>
				</Grid>
			</Grid>
    </Box>
  );
}
