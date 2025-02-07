import { GoTrashcan, GoReply } from "react-icons/go";
import { IMAGE_URL_REG } from "../helpers/consts";
import * as utils from "../helpers/utils";
import useToggle from "../hooks/useToggle";
import { memoService } from "../services";
import Image from "./Image";
import ProseMirrorEditor from "./Editor/ProseMirrorEditor";
import toastHelper from "./Toast";

interface Props {
  memo: Memo;
}

const ArchivedMemo: React.FC<Props> =
  /**
   *
   */
  (props: Props) => {
    const { memo: propsMemo } = props;
    const memo = {
      ...propsMemo,
      createdAtStr: utils.getDateTimeString(propsMemo.createdTs),
      archivedAtStr: utils.getDateTimeString(propsMemo.updatedTs ?? Date.now()),
    };
    const [showConfirmDeleteBtn, toggleConfirmDeleteBtn] = useToggle(false);
    const imageUrls = Array.from(memo.content.match(IMAGE_URL_REG) ?? []).map((s) => s.replace(IMAGE_URL_REG, "$1"));

    const handleDeleteMemoClick = async () => {
      if (showConfirmDeleteBtn) {
        try {
          await memoService.deleteMemoById(memo.id);
          await memoService.fetchAllMemos();
        } catch (error: any) {
          toastHelper.error(error.message);
        }
      } else {
        toggleConfirmDeleteBtn();
      }
    };

    const handleRestoreMemoClick = async () => {
      try {
        await memoService.patchMemo({
          id: memo.id,
          rowStatus: "NORMAL",
        });
        await memoService.fetchAllMemos();
        toastHelper.info("Restored successfully");
      } catch (error: any) {
        toastHelper.error(error.message);
      }
    };

    const handleMouseLeaveMemoWrapper = () => {
      if (showConfirmDeleteBtn) {
        toggleConfirmDeleteBtn(false);
      }
    };

    return (
      <div className={`archived-memo  ${"memos-" + memo.id}`} onMouseLeave={handleMouseLeaveMemoWrapper}>
        <div className="memo-top-wrapper">
          <span className="time-text">删除于 {memo.archivedAtStr}</span>
          <div className="btns">
            <GoReply />
            <GoTrashcan className={`${showConfirmDeleteBtn ? "final-confirm" : ""}`} onClick={handleDeleteMemoClick} />
          </div>
        </div>
        <ProseMirrorEditor foldable editable={false} cardMode content={memo.content} />
        {/*<Only when={imageUrls.length > 0}>*/}
        {/*  <div className="images-wrapper">*/}
        {/*    {imageUrls.map((imgUrl, idx) => (*/}
        {/*      <Image className="memo-img" key={idx} imgUrl={imgUrl} />*/}
        {/*    ))}*/}
        {/*  </div>*/}
        {/*</Only>*/}
      </div>
    );
  };

export default ArchivedMemo;
