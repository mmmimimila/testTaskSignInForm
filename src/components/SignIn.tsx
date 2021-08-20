import React, {SyntheticEvent, useState} from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import {useHistory, Redirect} from "react-router-dom";
import axios from "axios";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://nekta.tech/">
        NEKTA
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

type Inputs = {
  email: string;
  password: string;
};


const schema = yup.object().shape({
  email: yup
    .string()
    .matches(/.+@.+\..+/i, `Email должен содержать @. Пример: email@example.com`)
    .required("Это поле обязательно для заполнения"),
  password: yup
    .string()
    .matches(/(.*?).{8,}/, "Пароль должен состоять минимум из восьми символов")
    .required("Это поле обязательно для заполнения"),
});

  export const SignIn = () => {

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [apiErrors, setApiErrors] = useState<string[]>([]);

  const classes = useStyles();

  const history = useHistory();

  const { register, handleSubmit, formState: { errors }} = useForm<Inputs>({resolver: yupResolver(schema)
  });
  const onSubmit: SubmitHandler<Inputs> =  (data: {email: string; password: string}) => {
    console.log(data);
    axios({
      method: 'post',
      url: 'https://core.nekta.cloud/api/auth/login ',
      data: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json'
    }
    }).then(function (res) {
        localStorage.setItem('token', JSON.stringify(res.data.access_token));
        <Redirect to='/devicesList'/>
        history.push('/devicesList');
        console.log(res);
      })
      .catch(function (err) {
        console.log('error', err.response.data.error.data.msg);
        setApiErrors([err.response.data.error.data.msg]);
        console.dir(err);
    });
}


  const changeHandlerEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  }

  const changeHandlerPassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value)
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Авторизация
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)} className={classes.form} noValidate>
          <TextField
            value={email}
            {...register("email", {required: true})}
            onChange={changeHandlerEmail}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email"
            name="email"
            type="email"
            autoComplete="email"
            autoFocus
          />
            {errors.email?.message}
          <TextField
            value={password}
            {...register("password", {required: true})}
            onChange={changeHandlerPassword}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Пароль"
            type="password"
            id="password"
            autoComplete="current-password"/>
            {errors.password?.message}
            {apiErrors.map(error => <div>{error}</div>)}
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Запомнить"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Войти
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Забыли пароль?
              </Link>
            </Grid>
            <Grid item>
              <Link href="#" variant="body2">
                {"Нет аккаунта? Зарегистрируйтесь"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}

export default SignIn;