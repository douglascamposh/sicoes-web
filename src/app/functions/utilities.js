import moment from 'moment';

const FORMAT_DATE_SICOES = 'DD/MM/YYYY HH:mm:ss'; 
// correct this format
export const convertDateToMiliSeconds = (date) => {
    const [day, month, year] = date.split("/");
    const formattedDate = `${month}/${day}/${year}`;
    return new Date(formattedDate).getTime() / 1000;
}

export const dateStrToSeconds = (dateStr) => {
    const momentObj = moment(dateStr, FORMAT_DATE_SICOES);
    return momentObj.unix();
}

export const newItemObject = (obj) => {
    return {
        cuce: obj.cuce || '',
        entity: obj.entity || '',
        contract: obj.contract || '',
        modality: obj.modality || '',
        contractDescription: obj.contractDescription || '',
        auction: convertStringToBoolean(obj.auction) || false,
        stateAuction: obj.stateAuction || 0,
        publishDateItem: convertDateToMiliSeconds(obj.presentationDate) || 0,
        presentationDate: convertDateToMiliSeconds(obj.publishDateItem) || 0,
        form170Date: dateStrToSeconds(obj.form170Date),
        awardDate: 0,
    }
}

export const convertMiliSecondsToDate = (miliSeconds) => {
    const date = new Date(miliSeconds * 1000);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
}

export const convertBooleanToString = (dataBoolean) => {
     return dataBoolean? "Si" : "No";
}

export const convertStringToBoolean = (dataString) => {
    return dataString == "Si"? true : false;
}

export const transformData = (data) => {
  const adaptData = data.map((d) => {
            return {
                id : d.id,
                cuce: d.cuce || '',
                entity: d.entity || '',
                contract: d.contract || '',
                modality: d.modality || '',
                contractDescription: d.contractDescription || '',
                auction: convertBooleanToString(d.auction),
                stateAuction: d.stateAuction || 0,
                publishDateItem: convertMiliSecondsToDate(d.publishDateItem) || 0,
                presentationDate: convertMiliSecondsToDate(d.presentationDate) || 0,
                awardDate: convertMiliSecondsToDate(d.awardDate ) || 0,
            }
      
  })
  return adaptData;
}

export const transformedItem = (obj) => {
    return {
        id: obj.id || '',
        cuce: obj.cuce || '',
        entity: obj.entity || '',
        contract: obj.contract || '',
        modality: obj.modality || '',
        contractDescription: obj.contractDescription || '',
        auction: convertStringToBoolean(obj.auction) || false,
        stateAuction: obj.stateAuction || 0,
        publishDateItem: convertDateToMiliSeconds(obj.presentationDate) || 0,
        presentationDate: convertDateToMiliSeconds(obj.publishDateItem) || 0,
        awardDate: 0,
    }
}


