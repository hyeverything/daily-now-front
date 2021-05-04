/** @format */

import { AppBar, Button, makeStyles, Toolbar } from "@material-ui/core";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import logo from "../asset/img/logo_white.png";
const useStyles = makeStyles({
	appbar: {
		background: "#198BFB",
	},
	logo: {
		maxWidth: "185px",
		position: "absolute",
		top: "10px",
		left: "30px",
	},
	toolbar: {
		display: "flex",
		justifyContent: "flex-end",
	},
});
interface NavProps {
	isLoggedIn: boolean;
}
export default function Navigation(props: NavProps) {
	const history = useHistory();
	const classes = useStyles();

	return (
		<header>
			<AppBar position="fixed" className={classes.appbar}>
				<Toolbar className={classes.toolbar}>
					<Link to="/">
						<img 
						src={logo} 
						alt="데일리나우와 함께해요!" 
						className={classes.logo} />
					</Link>
					<div>
						<Button color="inherit" onClick={ () => history.push('/board')}>커뮤니티</Button>
						<Button color="inherit" onClick={ () => history.push('/faq')}>FAQ</Button>
						{props.isLoggedIn ? (
							<Button color="inherit" onClick={() => history.push('/home?tabName=MY_FUNDING')}>
								마이페이지
							</Button>
						) : (
							<>
								<Button color="inherit" onClick={() => history.push('/auth')}>
									로그인
								</Button>
								<Button color="inherit" onClick={() => history.push('/registration?share=FALSE')}>
									회원가입
								</Button>
							</>
						)}
					</div>
				</Toolbar>
			</AppBar>
		</header>
	);
}
