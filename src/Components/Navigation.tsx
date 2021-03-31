/** @format */

import { AppBar, Button, makeStyles, Toolbar } from "@material-ui/core";
import { useHistory } from "react-router";
import logo from "../asset/img/logo_white.png";
const useStyles = makeStyles({
	appbar: {
		background: "#198BFB",
	},
	logo: {
		maxWidth: "185px",
		position: "absolute",
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
	const handleMyPage = () => {
		history.push({
			pathname: "/mypage",
		});
	};
    const handleLogIn = () => {
        history.push({
			pathname: "/auth",
		});
    }
	const handleJoin = () => {
		history.push({
			pathname: "/registration",
		});
	};
	return (
		<div>
			<AppBar position="static" className={classes.appbar}>
				<Toolbar className={classes.toolbar}>
					<img src={logo} alt="daily logo" className={classes.logo} />
					<div>
						<Button color="inherit">커뮤니티</Button>
						<Button color="inherit">FAQ</Button>
						{props.isLoggedIn ? (
							<Button color="inherit" onClick={handleMyPage}>
								마이페이지
							</Button>
						) : (
							<>
								<Button color="inherit" onClick={handleLogIn}>
									로그인
								</Button>
								<Button color="inherit" onClick={handleJoin}>
									회원가입
								</Button>
							</>
						)}
					</div>
				</Toolbar>
			</AppBar>
		</div>
	);
}
