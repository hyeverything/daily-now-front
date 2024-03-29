import { makeStyles, Card, Typography } from "@material-ui/core";
import randingImage from "asset/img/randing_img.jpg";

const useStyles = makeStyles({
  randingContainer: {
    padding: "0",
    container: "0",
  },
  randing: {
    position: "relative",
    backgroundImage: `url(${randingImage})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    height: "100vh",
  },
  header: {
    color: "#ffffff",
    position: "absolute",
    left: 0,
    right: 0,
    top: "35%",
    width: "100%",
    height: "204px",
    padding: "0 100px",
  },
  title: {
    font: "normal normal bold 50px Noto Sans CJK KR",
    fontSize: "48px",
    lineHeight: "1.3125",
  },
  "@media(max-width: 1320px)": {
    title: {
      display: "none",
    },
  },
});

export default function Randing() {
  const classes = useStyles();

  return (
    <div className={classes.randingContainer}>
      <Card className={classes.randing} elevation={3}>
        <div className={classes.header}>
          <Typography className={classes.title} variant="h1" component="h1">
            <p>Daily Now</p>
          </Typography>
        </div>
      </Card>
    </div>
  );
}
