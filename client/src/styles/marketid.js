import styled from "styled-components";

const WrapperMarketID = styled.div`
   {
    .selected-coin {
      display: flex;
      flex-direction: column;
    }

    .price-before {
      margin-left: 25px;
    }
    .moreInfo{
      margin-left: 25px;
    }

    .container-coin {
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 15px;
      margin-bottom: 25px;
      border-radius: 6px;
      background: #faeff0;
      box-shadow: 0px 0px 12px #aaa, -0px -0px 12px #fff;
      flex-basis: 100%;
      gap: 20%;
    }

    .details {
      display: flex;
      flex-direction: column;
      justify-content: center;
      font-size: x-large;
      gap: 60%;
    }

    header {
      display: flex;
      align-content: center;
      justify-content: center;
      width: 1100px;
      margin: 0 auto;
      padding: 20px 0px 0px 0px;
    }
  }
`;

export default WrapperMarketID;