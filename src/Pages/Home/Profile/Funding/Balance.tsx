import React from "react";

import { Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import { fundInfo } from "Interface/User";

interface BalanceProps {
  fund: fundInfo;
}

const useStyles = makeStyles({
  ul: {
    listStyle: "none",
    padding: "0 40px",
    "& li": {
      display: "flex",
      justifyContent: "space-between",
    },
  },
});

export default function Balance(props: BalanceProps) {
  const classes = useStyles();
  const {
    total_investment,
    number_of_investing_products,
    residual_investment_price,
  } = props.fund;

  return (
    <div>
      <Typography variant="h5">🔒 잔고</Typography>
      <ul className={classes.ul}>
        <li>
          <h3>누적 투자액</h3> <p>{numberWithCommas(total_investment)} 원</p>
        </li>
        <li>
          <h3>투자 상품 수</h3> <p>{number_of_investing_products}</p>
        </li>
        <li>
          <h3>예정 상환금</h3>{" "}
          <p>{numberWithCommas(residual_investment_price)} 원</p>
        </li>
      </ul>
    </div>
  );
}

function numberWithCommas(x: string) {
  let number = Number(x);
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
