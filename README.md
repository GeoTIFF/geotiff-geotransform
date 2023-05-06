# geotiff-geotransform
Get Normalized GeoTransform for a GeoTIFF

## purpose
GeoTIFF files store geotranformation information in two different ways:
  1. ModelTiepointTag with ModelPixelScaleTag
  2. ModelTransformationTag

This library normalizes this information into an array of 6 coefficients, like the one used by GDAL: https://gdal.org/tutorials/geotransforms_tut.html

## install
```bash
npm install geotiff-geotransform
```

## usage
```js
import { fromFile } from "geotiff";
import Geotransform from "geotiff-geotransform";

// north-up image in Latitude/Longitude projection
// with ModelTiepoint and ModelPixelScale
const tif = await fromFile("./data/eu_pasture.tiff");
const img = await tif.getImage();
Geotransform(img);
[-31.456975828130908,0.08332825,0,80.7984254723645,0,-0.08332825]

// skewed image with ModelTransformationTag 
const tif = await fromFile("./data/umbra_mount_yasur.tiff");
const img = await tif.getImage();
Geotransform(img);
[337934.4836350695,-0.14299987236417117,-0.5767759114507439,7840518.464866471,-0.5767759114507457,0.14299987236414916]
```
