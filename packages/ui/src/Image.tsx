import Image from "next/image";
import React, {useState} from 'react';
import Assets from "../assets"
interface BasicImageProps{
	src:string
	alt?:string
	width?:number
	height?:number
}
function BasicImage({src, alt, width=24, height=24}:BasicImageProps) {
	const [defaultSrc, setDefaultSrc] = useState(src)
	const handleError = () =>{
		setDefaultSrc(Assets.defaultImage)
	}

	return (
		<Image src={defaultSrc} onError={handleError} alt={alt??`image_${src}`} width={width} height={height} layout={'fixed'}/>
	);
}

export default BasicImage;
