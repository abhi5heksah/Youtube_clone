import { House,
    Zap,
    MonitorPlay,
    SquareUser,
    History,
    ListVideo,
    SquarePlay,
    Clock5,
    ThumbsUp,
    ChevronRight,
    Flame,
    ShoppingBag,
    Music,
    Clapperboard,
    Radio,
    Gamepad2,
    Newspaper,
    Trophy,
    Lightbulb,
    Podcast,
    Settings,
    Flag,
    CircleHelp,
    MessageSquareWarning,
  } from 'lucide-react';


 interface SidebarItem {
  id:number;
  name:string;
  icon:JSX.Element;
  photo?:JSX.Element;
  }
 

export default function Sidebar() {

    const sidebarItems: SidebarItem[] = [
        {
            id:1,
            name:"Home",
            icon:<House/>
        },
        {
            id:2,
            name:"Shorts",
            icon:<Zap/>
        },
        {
          id:3,
          name:"Subscriptions",
          icon:<MonitorPlay/>
        }]

      const sidebarItems2: SidebarItem[] = [
        {
          id:1,
          name:"Your channel",
          icon:<SquareUser/>
        },
        {
          id:2,
          name:"History",
          icon:<History/>
        },
        {
          id:3,
          name:"Playlists",
          icon:<ListVideo/>
        },
        {
          id:4,
          name:"Your videos",
          icon:<SquarePlay/>
        },
        {
          id:5,
          name:"Watch later", 
          icon:<Clock5/>
        },
        {
          id:6,
          name:"Liked videos",
          icon:<ThumbsUp/>
        }
      ]

      const sidebarItems3: SidebarItem[] = [
        {
          id:1,
          name:"Trending",
          icon:<Flame/>
        },
        {
          id:2,
          name:"Shopping",
          icon:<ShoppingBag/>
        },
        {
          id:3,
          name:"Music",
          icon:<Music/>
        },
        {
          id:4,
          name:"Films",
          icon:<Clapperboard/>
        },
        {
          id:5,
          name:"Live",
          icon:<Radio/>
        },
        {
          id:6,
          name:"Gaming",
          icon:<Gamepad2/>
        },
        {
          id:7,
          name:"News",
          icon:<Newspaper/>
        },
        {
            id:8,
            name:"Sports",
            icon:<Trophy/>
        },
        {
          id:9,
          name:"Courses",  
          icon:<Lightbulb/>
        },
        {
          id:10,
          name:"Podcasts",  
          icon:<Podcast/>
        }
    ]

    const sidebarItems4: SidebarItem[] = [
        {
          id:1,
          name:"YouTube Premium",
          icon: <img src="images/yt-premium.svg" alt="premium" className='w-10 h-10 rounded-full cursor-pointer' />,
        },
        {
          id:2,
          name:"YouTube Studio",
          icon: <img src="images/yt-studio.svg" alt="studio" className='w-10 h-10 rounded-full cursor-pointer' />,
        },
        {
          id:3,
          name:"YouTube Music",
          icon: <img src="images/yt-music.svg" alt="music" className='w-10 h-10 rounded-full cursor-pointer' />,
        },
        {
          id:4,
          name:"YouTube Kids",
          icon: <img src="images/yt-kids.svg" alt="kids" className='w-10 h-10 rounded-full cursor-pointer' />,
        },
    ]

    const sidebarItems5: SidebarItem[] = [
        {
          id:1,
          name:"Settings",
          icon:<Settings/>
        },
        {
          id:2,
          name:"Report history",
          icon:<Flag/>
        },
        {
          id:3,
          name:"Help",
          icon:<CircleHelp/>
        },
        {
          id:4,
          name:"Send feedback",
          icon:<MessageSquareWarning/>
        }
      ]

  return (
    <>
    <div className='mt-14 px-6 text-black w-[20%] h-[calc(100vh-6.625rem)] overflow-y-scroll overflow-x-hidden '>
      {/* Home Section */}
        <div className=' mt-4  space-y-3 items-center '>
          {sidebarItems.map((item) => {
            return (
                  <div key={item.id} className='flex items-center space-x-6 hover:bg-gray-300 duration-300 rounded-xl p-1'>
                  <div className='text-xl cursor-pointer'>{item.icon}</div>
                <span className='cursor-pointer'>{item.name}</span>
            </div>
            );
          })}
        </div>
        <br />
        <hr />

        {/* You Section */}
        <div className='space-y-3 items-center '>
          <div className='flex items-center space-x-2'>
            <h1>You</h1>
             <ChevronRight className='text-xs'/>
          </div>
          {sidebarItems2.map((item) => {
            return (
                  <div key={item.id} className='flex items-center space-x-6 hover:bg-gray-300 duration-300 rounded-xl p-1'>
                  <div className='text-xl cursor-pointer'>{item.icon}</div>
                <span className='cursor-pointer'>{item.name}</span>
            </div>
            );
          })}
        </div>
        <br />
        <hr />


        {/* Explore Section */}
        <div className='space-y-3 items-center '>
          <div className='flex items-center space-x-2'>
            <h1>Explore</h1>
          </div>
          {sidebarItems3.map((item) => {
            return (
                  <div key={item.id} className='flex items-center space-x-6 hover:bg-gray-300 duration-300 rounded-xl p-1'>
                  <div className='text-xl cursor-pointer'>{item.icon}</div>
                <span className='cursor-pointer'>{item.name}</span>
            </div>
            );
          })}
        </div>
        <br />
        <hr />

        {/*  More Section */}
        <div className='space-y-3 items-center '>
          <div className='flex items-center space-x-2'>
            <h1 className='font-medium'>More from YouTube</h1>
          </div>
          {sidebarItems4.map((item) => {
            return (
                  <div key={item.id} className='flex items-center space-x-6 hover:bg-gray-300 duration-300 rounded-xl p-1'>
                  <div className='text-xl cursor-pointer size-6 -mt-4'>{item.icon}</div>
                <span className='cursor-pointer'>{item.name}</span>
            </div>
            );
          })}
        </div>
        <hr />



        {/*  Settings Section */} 
           <div className='space-y-3 items-center '>
          <div className='flex items-center space-x-2'>
          </div>
          {sidebarItems5.map((item) => {
            return (
                  <div key={item.id} className='flex items-center space-x-6 hover:bg-gray-300 duration-300 rounded-xl p-1'>
                  <div className='text-xl cursor-pointer'>{item.icon}</div>
                <span className='cursor-pointer'>{item.name}</span>
            </div>
            );
          })}
        <hr />
        </div>

        <span className='text-xs font-semibold text-gray-500 leading-[1rem]'>
          About Press Copyright
          <br/>
          Contact us Creator Advertisey Developers
          <br/>
          <p>
          Terms Privacy Policy & Safety <br />
          How YouTube works <br />
          Test new features <br />
          <br />
          © 2025 Google LLC
          </p>
          </span>
    </div>
    </>
  );
}