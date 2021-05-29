// React

import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';

// Material-UI

import { makeStyles, ThemeProvider } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import CardActions from '@material-ui/core/CardActions';
import CssBaseline from '@material-ui/core/CssBaseline';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import { Typography, List } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import { CardContent, Grid } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import FormatAlignJustifyIcon from '@material-ui/icons/FormatAlignJustify';

// Local Imports

import axiosInstance from '../axios';
import { baseurl } from '../axios';
import { isLogin } from './utils';

// Theme

import theme from './theme';

const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: 945,
        marginTop: '10px',
    },
    media: {
        height: 450,
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
    form: {
		width: '110ch', 
		alignItems: 'center',
        padding: theme.spacing(2),
	},
    submit: {
        alignItems: 'right',
        padding: theme.spacing(2),
    }
}));

export default function ListCreatePosts(){
    const { slug } = useParams();
    const classes = useStyles();

    const [threadData, setThreadData] = useState({
        loading: true,
        threads: null,
    });

    const initialPostData = useState({
        content: '',
    });

    const [postData, setPostData] = useState(initialPostData);

    const handleChange = (e) => {
        setPostData({
            ...postData,
            [e.target.name]: e.target.value.trim(),
        });
        console.log(postData.content);
    };

    console.log(threadData);

    const handleSubmit = (e) => {
        e.preventDefault();
        axiosInstance
                .post('/view_post/' + slug, {
                    content: postData.content,
                    likes: '0',
                    threadID: slug,
                    userID: threadData.userID,
                })
                .catch((err) => {
                    console.log(err);
                })
        window.location.reload();
    }

    useEffect(() => {
        axiosInstance.get('/view_post/' + slug).then((res) => {
            setThreadData({
                loading: false,
                threads: res.data.thread,
                posts: res.data.posts,
                userID: res.data.userID,
            });
            console.log(threadData);
            console.log(res.data);
        });
    }, [setThreadData]);

    if(threadData.loading) return <p>Loading Post</p>
    if(isLogin()){
        return (
           <ThemeProvider theme={ theme }>
            <CssBaseline />
            <Container component='main' maxWidth='md'>
                <div className={ classes.root }>
                    <List>
                        <Card className={ classes.root }>
                            <CardMedia className={ classes.media } image={ baseurl + 'media/' + threadData.threads.image } title="Image title"/>
                            <CardContent className={ classes.cardContent }>
                                <Typography gutterBottom variant="h2" component="h1" color="secondary" style={{ fontSize: 40 }} className={ classes.postTitle }>{ threadData.threads.title }</Typography>
                                <div className={ classes.postText }>
                                    <Typography variant="body2" component="p" color="secondary">{ threadData.threads.content }</Typography>
                                </div>
                            </CardContent>
                            <CardActions>
                                <Button size='small' color="secondary" href=''>
                                    { threadData.threads.created_by }
                                </Button>
                                <Button size='small' color='secondary' href=''>
                                    { threadData.threads.created_at.substr(0, 19) }
                                </Button>
                                <Button size='small' color='secondary' href=''>
                                    { threadData.threads.topic }
                                </Button>
                            </CardActions>
                        </Card>
                            { threadData.posts.map((post) => {
                                return (
                                    <Card className={ classes.root }>
                                        <CardContent className={ classes.cardContent }>
                                            <Typography gutterBottom variant="h5" component="h2" color="secondary" style={{ fontSize: 15 }} className={ classes.postTitle }>{ post.content }</Typography>
                                        </CardContent>
                                        <CardActions>
                                            <Button size='small' color='secondary' href=''>
                                                { post.posted_by }
                                            </Button>
                                            <Button size='small' color='secondary' href=''>
                                                { post.posted_at.substr(0, 19) }
                                            </Button>
                                        </CardActions>
                                    </Card>
                                );
                            }) }
                            <Card className={ classes.root }>
                            <form className={ classes.form } noValidate>
                                <TextField id='content' name='content' label='Content' multiline variant='outlined' color='secondary' fullWidth onChange={ handleChange } />
                            </form>
                            <Button style={{ padding: theme.spacing(1) }} size='small' color='secondary' onClick={ handleSubmit }>
                                Post
                            </Button>
                            </Card> 
                    </List>
                </div>
            </Container>
        </ThemeProvider> 
        );
    }
    return (
        <ThemeProvider theme={ theme }>
            <CssBaseline />
            <Container component='main' maxWidth='md'>
                <div className="feed">
            <Paper elevation = { 6 } style = { { padding: 4, backgroundColor: "primary", border: "2px", marginTop: '10px' } }>
            <Typography component="h1" variant="h2" color="secondary" style={{ fontSize: 35 }} className={ classes.link }>
                <FormatAlignJustifyIcon style={{ fontSize: 30, marginBottom: '-2.75px', marginRight: '3.5px' }}/>
                { threadData.threads.title }
            </Typography>
            </Paper>
        </div>
                <div className={ classes.root }>
                    <List>
                        <Card className={ classes.root }>
                            <CardMedia className={ classes.media } image={ baseurl + 'media/' + threadData.threads.image } title="Image title"/>
                            <CardContent className={ classes.cardContent }>
                                <Typography gutterBottom variant="h2" component="h1" color="secondary" style={{ fontSize: 40 }} className={ classes.postTitle }>{ threadData.threads.title }</Typography>
                                <div className={ classes.postText }>
                                    <Typography variant="body2" component="p" color="secondary">{ threadData.threads.content }</Typography>
                                </div>
                            </CardContent>
                            <CardActions>
                                <Button size='small' color="secondary" href=''>
                                    { threadData.threads.created_by }
                                </Button>
                                <Button size='small' color='secondary' href=''>
                                    { threadData.threads.created_at.substr(0, 19) }
                                </Button>
                                <Button size='small' color='secondary' href=''>
                                    { threadData.threads.topic }
                                </Button>
                            </CardActions>
                        </Card>
                            { threadData.posts.map((post) => {
                                return (
                                    <Card className={ classes.root }>
                                        <CardContent className={ classes.cardContent }>
                                            <Typography gutterBottom variant="h5" component="h2" color="secondary" style={{ fontSize: 15 }} className={ classes.postTitle }>{ post.content }</Typography>
                                        </CardContent>
                                        <CardActions>
                                            <Button size='small' color='secondary' href=''>
                                                { post.posted_by }
                                            </Button>
                                            <Button size='small' color='secondary' href=''>
                                                { post.posted_at.substr(0, 19) }
                                            </Button>
                                        </CardActions>
                                    </Card>
                                );
                            }) } 
                    </List>
                </div>
            </Container>
        </ThemeProvider>
    )
}


