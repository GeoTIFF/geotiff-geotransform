function geotransform(image, { debug = false } = { debug: false }) {
  const fd = image.fileDirectory;
  if (fd.ModelTransformation) {
    const [a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p] = fd.ModelTransformation;
    return [d, a, b, h, e, f];
  } else if (fd.ModelTiepoint && !fd.ModelPixelScale) {
    if (debug) console.log("[geotiff-geotransform] missing ModelPixelScaleTag");
  } else if (fd.ModelPixelScale && !fd.ModelTiepoint) {
    if (debug) console.log("[geotiff-geotransform] missing ModelTiepointTag");
  } else if (fd.ModelTiepoint && fd.ModelPixelScale) {
    const [i, j, k, x, y, z] = fd.ModelTiepoint;
    if (debug) {
      if (i !== 0) console.log("[geotiff-geotransform] unexpected i value in ModelTiepoint: " + i);
      if (j !== 0) console.log("[geotiff-geotransform] unexpected j value in ModelTiepoint: " + j);
      if (k !== 0) console.log("[geotiff-geotransform] unexpected k value in ModelTiepoint: " + k);
    }
    const [scaleX, scaleY, scaleZ] = fd.ModelPixelScale;
    return [x, scaleX, 0, y, 0, -1 * scaleY];
  }
}

if (typeof define === "function" && define.amd) {
  define(function () {
    return geotransform;
  });
}

if (typeof module === "object") {
  module.exports = geotransform;
  module.exports.default = geotransform;
}
