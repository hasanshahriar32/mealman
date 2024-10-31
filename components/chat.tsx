"use client";
import React from "react";
import { Helmet } from "react-helmet";
function ChatPlugin() {
  return (
    <div>
      {/* Your component content here */}

      {/* Add the following Helmet component to include the script in the head */}
      <Helmet>
        <script type="text/javascript">
          {`
            window.$crisp = [];
            window.CRISP_WEBSITE_ID = "72630f29-8348-44df-8169-779a54df07a9";
            (function() {
              var d = document;
              var s = d.createElement("script");
              s.src = "https://client.crisp.chat/l.js";
              s.async = 1;
              d.getElementsByTagName("head")[0].appendChild(s);
            })();
          `}
        </script>
      </Helmet>
    </div>
  );
}

export default ChatPlugin;
