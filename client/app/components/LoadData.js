import React, { useEffect, useState } from 'react';

const loadData = async(dataURL) => {

    var response = await fetch('http://172.16.38.81:3000' + dataURL)

}
export default loadData;
