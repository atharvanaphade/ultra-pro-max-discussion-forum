import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import axiosInstance from '../axios';

// Material-UI

import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import CardActions from '@material-ui/core/CardActions';
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import FormatAlignJustifyIcon from '@material-ui/icons/FormatAlignJustify';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

// Theme

import theme from './theme';
import { CardContent, Grid, ThemeProvider, Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: 345,
    },
    media: {
        height: 140,
    },
    paper: {
        marginTop: theme.spacing(8),
        alignItems: 'center',
		color: "#e2b714",
    },
    cardMedia: {
        paddingTop: '56.25%',
    },
    link: {
        margin: theme.spacing(1, 1.5),
        color: "#e2b714",
    },
    cardHeader: {
        backgroundColor: "primary",
    },
    postTitle: {
        fontSize: '20px',
        textAlign: 'left',
        color: "#e2b714",
    },
    postText: {
        display: 'flex',
        justifyContent: 'left',
		alignItems: 'baseline',
		fontSize: '10px',
		textAlign: 'left',
		marginBottom: theme.spacing(1),
        color: "#e2b714",
    },
}));

const Posts = (props) => {
    const { posts } = props;
    const classes = useStyles();

    if (!posts || posts.length === 0) return <p>Cannot find any posts! Sorry</p>;
    return (
        <React.Fragment>
            <ThemeProvider theme = { theme } >
            <CssBaseline/>
            <Container maxWidth="md" component="main">
                <div className={ classes.paper }>
                    <Grid container spacing={5} alignItems="flex-end">
                        {posts.map((post) =>{
                            return (
                                <Grid item key = { post.id } xs={ 12 } md={ 4 }>
                                    <Card className={ classes.root } >
                                    <CardMedia className={ classes.media } image={ post.media } title="Image title" />
                                    <CardContent className={ classes.cardContent }>
                                        <Typography gutterBottom variant="h5" component="h2" color="secondary" className={ classes.postTitle }>{ post.title.substr(0, 50) }...</Typography>
                                        <div className={ classes.postText }>
                                            <Typography variant="body2" component="p" color="secondary">{ post.content.substr(0, 30) }</Typography>
                                        </div>
                                    </CardContent>
                                    <CardActions>
                                        <Button size='small' color="secondary" href={ '/view_post/' + post.id }>
                                            View Post
                                        </Button>
                                    </CardActions>
                                    </Card>
                                </Grid>
                            );
                        })}
                    </Grid>
                    </div>
            </Container>
            </ThemeProvider>
        </React.Fragment>
    );
};

function PostLoadingComponent(Component) {
	return function PostLoadingComponent({ isLoading, ...props }) {
		if (!isLoading) return <Component {...props} />;
		return (
            <ThemeProvider theme = { theme }>
            <CssBaseline />
			<p style={{ fontSize: '25px' }}>
				We are waiting for the data to load!...
			</p>
            </ThemeProvider>
		);
	};
}

export default function Feed(){
    const PostLoading = PostLoadingComponent(Posts);
    const [appState, setAppState] = useState({
        loading: true,
        posts: null,
    });

    const classes = useStyles();

    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
       setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
       setAnchorEl(null);
    };

    useEffect(() =>{
        axiosInstance.get('/threads/').then((res) =>{
            const allPosts = res.data;
            console.log(res.data);
            setAppState({ loading: false, posts: allPosts });
            console.log(res.data);
        });
    }, [setAppState]);
    return (
        <ThemeProvider theme={ theme }>
        <CssBaseline />
        <div className="feed">
            <Paper elevation = { 6 } style = { { padding: 4, backgroundColor: "primary", border: "2px", marginTop: '10px' } }>
            <Typography component="h1" variant="h2" color="secondary" style={{ fontSize: 35 }} className={ classes.link }>
                <Button style={{ fontSize: 30, marginBottom:'2.25px', marginRight: '2.5px' }} aria-controls="simple-menu" aria-haspopup="true" color='secondary' onClick={ handleClick }>
                <FormatAlignJustifyIcon/>
                </Button>
                <Menu
                        id="simple-menu"
                        anchorEl={ anchorEl }
                        keepMounted
                        open={ Boolean(anchorEl) }
                        onClose={ handleClose }
                        color='#e2b714'
                    >
                        <MenuItem component={Link} to='/new_thread/'>New Thread</MenuItem>
                </Menu>
                Latest Posts
            </Typography>
            </Paper>
            <PostLoading isLoading={ appState.loading } posts={ appState.posts } />
        </div>
        </ThemeProvider>
    );
}