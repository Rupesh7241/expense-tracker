// // import React, { useState } from 'react'
// // import EmojiPicker, { Emoji } from "emoji-picker-react";
// // import { LuImage, LuX } from "react-icons/lu";

// // const EmojiPickerPopup = ({icon, onSelect}) => {
// //   const [isOpen, setIsOpen] = useState(false);
// //   return (
// //     <div className="flex flex-col md:flex-row item-start gap-5 mb-6">
// //       <div 
// //         className="flex items-center gap-4 cursor-pointer"
// //         onClick={() => setIsOpen(true)}
// //         >
// //           <div className="w-12 h-12 flex items-center justify-center text-2xl bg-purple-50 text-primary rounded-lg">
// //             {icon ? (
// //               <img src={icon} alt="Icon" className="w-12 h-12" />
// //             ) : (
// //               <LuImage />
// //             )}
// //           </div>

// //           <p className="">{icon ? "Change Icon" : "Pick Icon"}</p>
// //         </div>

// //         {isOpen && (
// //           <div className="relative">
// //             <button
// //             className="w-7 h-7 flex items-center justify-center bg-white border border-gray-200 rounded-full absolute -top-2 -right-2 z-10 cursor-pointer"
// //             onClick={() => setIsOpen(false)}
// //             >
// //               <LuX />
// //             </button>

// //             <EmojiPicker
// //             open={isOpen}
// //             onEmojiClick={(Emoji) => onSelect(Emoji?.imageUrl || "")}
// //             />
// //             </div>
// //         )}
// //     </div>
// //   )
// // }

// // export default EmojiPickerPopup


// import React, { useState } from 'react';
// import EmojiPicker from "emoji-picker-react";
// import { LuImage, LuX } from "react-icons/lu";

// const EmojiPickerPopup = ({ icon, onSelect }) => {
//   const [isOpen, setIsOpen] = useState(false);

//   return (
//     <div className="flex flex-col md:flex-row items-start gap-5 mb-6">
//       <div
//         className="flex items-center gap-4 cursor-pointer"
//         onClick={() => setIsOpen(true)}
//       >
//         <div className="w-12 h-12 flex items-center justify-center text-2xl bg-purple-50 text-primary rounded-lg">
//           {icon ? icon : <LuImage />}
//         </div>
//         <p>{icon ? "Change Icon" : "Pick Icon"}</p>
//       </div>

//       {isOpen && (
//         <div className="relative z-50">
//           <button
//             className="w-7 h-7 flex items-center justify-center bg-white border border-gray-200 rounded-full absolute -top-2 -right-2 z-10 cursor-pointer"
//             onClick={() => setIsOpen(false)}
//           >
//             <LuX />
//           </button>

//           <EmojiPicker
//             open={isOpen}
//             onEmojiClick={(emojiData) => {
//               console.log("emoji selected:", emojiData);
//               onSelect(emojiData.emoji);
//               setIsOpen(false); // close popup after selection
//             }}
//           />
//         </div>
//       )}
//     </div>
//   );
// };

// export default EmojiPickerPopup;


import React, { useState } from 'react';
import EmojiPicker from "emoji-picker-react";
import { LuImage, LuX } from "react-icons/lu";

const EmojiPickerPopup = ({ icon, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex flex-col md:flex-row items-start gap-5 mb-6">
      <div
        className="flex items-center gap-4 cursor-pointer"
        onClick={() => setIsOpen(true)}
      >
        <div className="w-12 h-12 flex items-center justify-center text-2xl bg-purple-50 text-primary rounded-lg">
          {icon ? icon : <LuImage />}
        </div>
        <p>{icon ? "Change Icon" : "Pick Icon"}</p>
      </div>

      {isOpen && (
        <div className="relative z-50">
          <button
            className="w-7 h-7 flex items-center justify-center bg-white border border-gray-200 rounded-full absolute -top-2 -right-2 z-10 cursor-pointer"
            onClick={() => setIsOpen(false)}
          >
            <LuX />
          </button>

          <EmojiPicker
            open={isOpen}
            height={300}   // 👈 fix height
            width={300}    // 👈 fix width
            onEmojiClick={(emojiData) => {
              console.log("emoji selected:", emojiData);
              onSelect(emojiData.emoji);
              setIsOpen(false);
            }}
          />
        </div>
      )}
    </div>
  );
};

export default EmojiPickerPopup;
