/* eslint-disable array-callback-return */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable no-shadow */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useCallback, useEffect, useRef, useState } from "react";
import { GrDocumentTxt } from "react-icons/gr";
import { SiReadthedocs, SiMicrosoftexcel } from "react-icons/si";
import { AiFillFileUnknown } from "react-icons/ai";
import { FaRegFilePowerpoint } from "react-icons/fa";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import MDButton from "components/MDButton";
import Constants from "../../core/Constants";

function MultiFileUpload(props) {
  const fileObj = [];

  const fileArray = [];

  const fileList = [];

  const { labelupload, viewonly } = props;
  const fileInput = useRef();
  const [file, setFile] = useState([]);
  const [oldimg, setoldimg] = useState([]);
  //   constructor(props) {
  //     super(props);
  //     this.state = { file: [], oldimg: [] };
  //     this.uploadMultipleFiles = this.uploadMultipleFiles.bind(this);
  //     this.uploadFiles = this.uploadFiles.bind(this);
  //     this.handleClick = this.handleClick.bind(this);
  //   }
  const uploadMultipleFiles = useCallback((e) => {
    if (e.target.files) {
      fileObj.push(e.target.files);
      console.log(e.target.files[0]);
      const obj = {
        bloburl: URL.createObjectURL(e.target.files[0]),
        name: e.target.files[0].name.split(".")[0],
        extension: e.target.files[0].name.split(".")[1],
      };
      fileArray.push(obj);
      fileList.push(e.target.files[0]);
    }
    setFile(fileArray);
    props.onChange(fileList);
  });
  const uploadFiles = useCallback((e) => {
    e.preventDefault();
    console.log(file);
  });
  //   componentDidMount() {
  //     const files = props.placeholder;
  //     const array = [];
  //     if (files)
  //       files.map((file) => {
  //         const obj = {
  //           bloburl: `${Constants.serverlink}upload/${file.filename}`,
  //           name: file.filetitle,
  //           extension: file.filename.split(".")[1],
  //         };
  //         array.push(obj);
  //       });

  //     this.setState({ oldimg: array });
  //   }
  useEffect(() => {
    const files = props.placeholder;
    const array = [];
    if (files)
      files.map((file) => {
        const obj = {
          bloburl: `${Constants.serverlink}upload/${file.filename}`,
          name: file.filetitle,
          extension: file.filename.split(".")[1],
        };
        array.push(obj);
      });
    setoldimg(array);
  }, []);

  const handleClick = () => {
    fileInput.click();
  };

  //   uploadMultipleFiles(e) {
  //     if (e.target.files) {
  //       this.fileObj.push(e.target.files);
  //       console.log(e.target.files[0]);
  //       const obj = {
  //         bloburl: URL.createObjectURL(e.target.files[0]),
  //         name: e.target.files[0].name.split(".")[0],
  //         extension: e.target.files[0].name.split(".")[1],
  //       };
  //       this.fileArray.push(obj);
  //       this.fileList.push(e.target.files[0]);
  //     }
  //     this.setState({ file: this.fileArray });
  //     this.props.onChange(this.fileList);
  //   }

  const deletOldImg = (index) => {
    let oldfildname = "";
    if (oldimg.length > index) {
      oldfildname = oldimg[index];
      oldimg.splice(index, 1);
    }
    // this.setState({ oldimg });
    setoldimg(oldimg);
    props.onChangeDeleteOld(oldfildname);
  };

  const deletImg = (index) => {
    console.log("delete ", index);

    if (fileObj.length > index) {
      fileObj.splice(index, 1);
    }
    if (fileArray.length > index) {
      fileArray.splice(index, 1);
    }
    if (fileList.length > index) {
      fileList.splice(index, 1);
    }
    setFile(fileArray);
    props.onChange(fileList);
  };

  const renderSVG = (ext) => {
    if (ext === "txt") {
      return <GrDocumentTxt style={{ fontSize: "20px" }} />;
    }
    if (ext === "docx") {
      return <SiReadthedocs style={{ fontSize: "20px" }} />;
    }
    if (ext === "pdf") {
      return <PictureAsPdfIcon style={{ fontSize: "20px" }} />;
    }
    if (ext === "pptx") {
      return <FaRegFilePowerpoint style={{ fontSize: "20px" }} />;
    }
    if (ext === "xlsx") {
      return <SiMicrosoftexcel style={{ fontSize: "20px" }} />;
    }
    return <AiFillFileUnknown style={{ fontSize: "20px" }} />;
  };

  const renderImage = (files, index, old) => {
    if (
      files.extension === "jpg" ||
      files.extension === "png" ||
      files.extension === "jpeg" ||
      files.extension === "gif"
    ) {
      return (
        <div className="fileinput text-center">
          <div className="thumbnail">
            <img src={file.bloburl} alt="..." />
          </div>
          {!viewonly && (
            <MDButton color="danger" className="btn-round" onClick={() => deletImg(index)}>
              Remove
            </MDButton>
          )}
        </div>
      );
    }
    return (
      <div className="newthumb" key={index}>
        <div style={{ display: "flex" }}>
          <div>
            <div>{renderSVG(file.extension)}</div>
          </div>
          <div>
            <a
              href={file.bloburl}
              style={{ cursor: "pointer" }}
              target="_blank"
              rel="noreferrer noopener"
            >
              <p style={{ fontSize: "15px", marginBottom: "0", marginLeft: "10px" }}>{file.name}</p>
            </a>
          </div>
        </div>
        <div>
          {!viewonly && (
            <MDButton
              color="danger"
              className="btn-round"
              onClick={() => (old ? deletOldImg(index) : deletImg(index))}
            >
              {" "}
              Remove
            </MDButton>
          )}
        </div>
      </div>
    );
  };
  if (viewonly) {
    return "";
  }
  return (
    <form>
      {(fileArray || []).map((file, index) => renderImage(file, index, false))}

      {(oldimg || []).map((file, index) => renderImage(file, index, true))}

      <div className="form-group">
        <input
          type="file"
          className="form-control"
          ref={fileInput}
          onChange={uploadMultipleFiles}
          multiple
        />
      </div>

      <MDButton className="btn-round" onClick={() => handleClick()}>
        {labelupload}
      </MDButton>
    </form>
  );
}
export default MultiFileUpload;
