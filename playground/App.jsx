import {
  ChainInterlayDark,
  ChainInterlayLight,
  LinkSubsocial,
} from "../opensquare";
import { SystemEdit, SystemLoading } from "../subsquare";

export default function App() {
  return (
    <div style={{ color: "red" }}>
      <SystemLoading />
      <SystemEdit />
      <ChainInterlayLight />
      <ChainInterlayDark />
      <LinkSubsocial />
    </div>
  );
}
