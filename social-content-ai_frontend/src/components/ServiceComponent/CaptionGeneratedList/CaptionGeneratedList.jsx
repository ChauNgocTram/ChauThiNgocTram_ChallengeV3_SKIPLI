import React, { useState } from "react";
import "./CaptionGeneratedList.scss";
import { GoBookmark, GoBookmarkFill } from "react-icons/go";
import { FacebookShareButton, EmailShareButton, FacebookIcon, EmailIcon } from "react-share";
import { useSaveGeneratedContent } from "../../../hooks/useAuth";

const CaptionGeneratedList = ({ captions, subject }) => {
  const [savedCaptions, setSavedCaptions] = useState([]);
  const { mutate: saveContent, isLoading: saving } = useSaveGeneratedContent();

  const handleSave = async (caption) => {
    try {
      const phoneNumber = localStorage.getItem("phoneNumber"); // Assuming you still need this for phone number
      if (!phoneNumber) {
        throw new Error("Phone number is not available in local storage");
      }

      saveContent(
        { topic: subject, data: caption, phone_number: phoneNumber },
        {
          onSuccess: (data) => {
            console.log("Save Content Response:", data);
            if (data && data.contentId) {
              setSavedCaptions(prev => [...prev, data.contentId]);
            } else {
              console.error("Unexpected response structure:", data);
            }
          },
          onError: (error) => {
            console.error("Error saving content:", error);
          }
        }
      );
    } catch (error) {
      console.error("Error saving content:", error);
    }
  };



  return (
    <div className="captionGeneratedList">
      {captions.length > 0 && (
        <>
          <h2>Captions generated for you</h2>
          {captions.map((caption, index) => (
            <div key={index} className="captionCard">
              <span>{caption}</span>

              <div className="captionCard__action">
                <div className="captionCard__action__share">
                  <FacebookShareButton url={window.location.href} quote={caption}>
                    <FacebookIcon size={32} round />
                  </FacebookShareButton>
                  <EmailShareButton subject="Check out this caption" body={caption}>
                    <EmailIcon size={32} round />
                  </EmailShareButton>
                </div>

                <div
                  className="captionCard__action__save"
                  onClick={() => savedCaptions.includes(caption) ? handleUnsave(caption) : handleSave(caption)}
                >
                 <GoBookmark />Save
                </div>
              </div>
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default CaptionGeneratedList;
