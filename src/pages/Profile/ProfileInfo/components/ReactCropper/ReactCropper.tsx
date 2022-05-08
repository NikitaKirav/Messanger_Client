/** Absolute imports */
import React, { useEffect, useRef, useState } from "react";
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";
import { useDispatch, useSelector } from 'react-redux';
import { createStructuredSelector } from "reselect";

/** Store */
import { addPhoto } from "../../../../../store/profile/actions";
import { makeGetPhotoLarge } from "../../../../../store/profile/selectors";
import { ApplicationState } from "../../../../../store";

/** Styles */
import './styles.scss';
import { baseUrl } from "../../../../../services/baseURL";


interface PropsType {
  rerender: boolean;
}

interface ReactCropperSelectors {
    photoLarge: string | undefined | null;
}

export const ReactCropper: React.FC<PropsType> = React.memo(({rerender}) => {

  const dispatch = useDispatch();
  const cropperRef = useRef<HTMLImageElement>(null);
  const [key, setKey] = useState(0);

  const selectors = createStructuredSelector<
    ApplicationState,
    ReactCropperSelectors
    >({
        photoLarge: makeGetPhotoLarge()
    });

  const { photoLarge } = useSelector(selectors);

  useEffect(() => {
    setKey(key + 1);
  }, [rerender])

  const onCrop = () => {
    const imageElement: any = cropperRef?.current;
    const cropper: any = imageElement?.cropper;
    let imageData = cropper.getCroppedCanvas().toDataURL();
    dispatch(addPhoto(imageData));
  };

  return (<div key={key}>
            {photoLarge &&
                <Cropper
                    src={baseUrl + photoLarge}
                    style={{ height: 400, width: "100%" }}
                    // Cropper.js options
                    initialAspectRatio={1}
                    guides={false}
                    crop={onCrop}
                    ref={cropperRef}
                />  
            }
        </div>
  );
});