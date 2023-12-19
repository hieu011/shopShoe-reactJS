import axios from "axios";
import React, { Component } from "react";

class CldCustUploadLgRestApi extends Component {
  processFile = async (e) => {
    let file = e.target.files[0];

    // Set your cloud name and unsigned upload preset here:
    const YOUR_CLOUD_NAME = "dw3x98oui";
    const YOUR_UNSIGNED_UPLOAD_PRESET = "ml_default";

    const POST_URL =
      "https://api.cloudinary.com/v1_1/" + YOUR_CLOUD_NAME + "/auto/upload";

    send();

    function send() {
      var formdata = new FormData();


      formdata.append("file", file);
      formdata.append("cloud_name", YOUR_CLOUD_NAME);
      formdata.append("upload_preset", YOUR_UNSIGNED_UPLOAD_PRESET);

      console.log(formdata);

      axios({
        method: 'post',
        url: POST_URL,
        data: formdata
      })
    }
  };

  render() {
    return (
      <div>
        <input className="form-control" type="file" onChange={this.processFile} />
      </div>
    );
  }
}

export default CldCustUploadLgRestApi;
