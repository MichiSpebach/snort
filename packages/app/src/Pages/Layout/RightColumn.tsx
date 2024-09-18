import classNames from "classnames";
import { FormattedMessage } from "react-intl";

import { RightColumnWidget } from "@/Components/RightWidgets";
import { BaseWidget } from "@/Components/RightWidgets/base";
import InviteFriendsWidget from "@/Components/RightWidgets/invite-friends";
import MiniStreamWidget from "@/Components/RightWidgets/mini-stream";
import SearchBox from "@/Components/SearchBox/SearchBox";
import { TaskList } from "@/Components/Tasks/TaskList";
import TrendingHashtags from "@/Components/Trending/TrendingHashtags";
import TrendingNotes from "@/Components/Trending/TrendingPosts";
import TrendingUsers from "@/Components/Trending/TrendingUsers";
import useLogin from "@/Hooks/useLogin";

export default function RightColumn() {
  const { pubkey } = useLogin(s => ({ pubkey: s.publicKey }));
  const hideRightColumnPaths = ["/login", "/new", "/messages"];
  const show = !hideRightColumnPaths.some(path => globalThis.location.pathname.startsWith(path));

  const widgets = pubkey
    ? [
        RightColumnWidget.TaskList,
        RightColumnWidget.InviteFriends,
        //RightColumnWidget.LiveStreams,
        RightColumnWidget.TrendingNotes,
        RightColumnWidget.TrendingPeople,
        RightColumnWidget.TrendingHashtags,
      ]
    : [RightColumnWidget.TrendingPeople, RightColumnWidget.TrendingHashtags];

  const getWidget = (t: RightColumnWidget) => {
    switch (t) {
      case RightColumnWidget.TaskList:
        return <TaskList />;
      case RightColumnWidget.TrendingNotes:
        return (
          <BaseWidget title={<FormattedMessage defaultMessage="Trending Notes" />}>
            <TrendingNotes small={true} count={6} />
          </BaseWidget>
        );
      case RightColumnWidget.TrendingPeople:
        return (
          <BaseWidget title={<FormattedMessage defaultMessage="Trending People" />}>
            <TrendingUsers count={6} followAll={false} profileActions={pubkey ? () => undefined : () => <></>} />
          </BaseWidget>
        );
      case RightColumnWidget.TrendingHashtags:
        return (
          <BaseWidget title={<FormattedMessage defaultMessage="Popular Hashtags" />}>
            <TrendingHashtags short={true} count={6} />
          </BaseWidget>
        );
      case RightColumnWidget.InviteFriends:
        return <InviteFriendsWidget />;
      case RightColumnWidget.LiveStreams:
        return <MiniStreamWidget />;
    }
  };

  return (
    <div
      className={classNames(
        "text-secondary flex-col hidden lg:w-1/3 sticky top-0 h-screen py-3 px-4 border-l border-border-color",
        {
          "lg:flex": show,
        },
      )}>
      <div>
        <SearchBox />
      </div>
      <div className="flex flex-col gap-4 overflow-y-auto">{widgets.map(getWidget)}</div>
    </div>
  );
}
