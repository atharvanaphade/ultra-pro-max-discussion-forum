// React

import React from 'react';

// Material UI

import Container from '@material-ui/core/Container';
import { makeStyles, ThemeProvider } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import Box from '@material-ui/core/Box';
import FavoriteIcon from '@material-ui/icons/Favorite';
import { CssBaseline } from '@material-ui/core';

// Theme 

import theme from './theme';

const useStyles = makeStyles((theme) => ({
	'@global': {
		ul: {
			margin: 0,
			padding: 0,
			listStyle: 'none',
		},
	},
	footer: {
		borderTop: `1px solid ${theme.palette.divider}`,
		marginTop: theme.spacing(8),
		paddingTop: theme.spacing(3),
		paddingBottom: theme.spacing(3),
        color: "#e2b714",
		[theme.breakpoints.up('sm')]: {
			paddingTop: theme.spacing(6),
			paddingBottom: theme.spacing(6),
		},
	},
}));

function Copyright() {
	return (
        <ThemeProvider theme = { theme }>
		<Typography variant="body2" color="secondary" align="center">
			{'Made With  '}
			<FavoriteIcon style={{ color: '#DC143C', fontSize: 15 }}/>{'  by Atharva Naphade'}
			{'.'}
		</Typography>
        </ThemeProvider>
	);
}

const footers = [
	{
		title: '',
		description: ['', '', '', ''],
	},
	{
		title: '',
		description: [
			'',
			'',
			'',
			'',
			'',
		],
	},
	{
		title: '',
		description: [
			'',
			'',
			'',
			'',
		],
	},
	{
		title: '',
		description: ['', ''],
	},
];

function Footer() {
	const classes = useStyles();

	return (
		<React.Fragment>
            <ThemeProvider theme = { theme }>
            <CssBaseline/>
            <div className="footer">
			<Container maxWidth="md" component="footer" className={classes.footer}>
				<Grid container spacing={4} justify="space-evenly">
					{footers.map((footer) => (
						<Grid item xs={6} sm={3} key={footer.title}>
							<Typography variant="h6" color="inherit" gutterBottom>
								{footer.title}
							</Typography>
							<ul>
								{footer.description.map((item) => (
									<li key={item}>
										<Link href="#" variant="subtitle1" color="inherit">
											{item}
										</Link>
									</li>
								))}
							</ul>
						</Grid>
					))}
				</Grid>
				<Box mt={5}>
					<Copyright />
				</Box>
			</Container>
            </div>
            </ThemeProvider>
		</React.Fragment>
	);
}

export default Footer;