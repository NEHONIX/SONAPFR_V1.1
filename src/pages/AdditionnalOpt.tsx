import { AgenceDapui, ConseiCafeCacao, Firca } from "./Assets/AllAssets";
import "./Style/AdditionnalOpt.css"
function AdditionnalOpt() {
  return (
    <div className="additionnal-opt">
      <img src={Firca} alt="Firca" />
      <img src={ConseiCafeCacao} alt="ConseiCafeCacao" />
      <img src={AgenceDapui} alt="AgenceDapui" /> <br /><br />
    </div>
  );
}

export default AdditionnalOpt;
