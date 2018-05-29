import {Injectable} from '@angular/core';

@Injectable()
export class ObjectToFormdataService {


  isObject(value: any) {
    return value === Object(value);


  }

  isArray(value: any) {
    return Array.isArray(value);
  }

  isFile(value: any) {
    return value instanceof File;
  }

  makeArrayKey(key: any, index: number) {
    if (key.length > 2 && key.lastIndexOf('[]') === key.length - 2) {
      return key;
    } else {
      return key + '[' + index + ']';
    }
  }

  objectToFormData(obj: any, fd: any, pre: any) {
    fd = fd || new FormData();
    Object.keys(obj).forEach((prop) => {


      const key = pre ? (pre + '[' + prop + ']') : prop;

      if (this.isObject(obj[prop]) && !this.isArray(obj[prop]) && !this.isFile(obj[prop])) {


        this.objectToFormData(obj[prop], fd, key);
      } else if (this.isArray(obj[prop])) {

        obj[prop].forEach((value, index) => {
          const arrayKey = this.makeArrayKey(key, index);

          if (this.isObject(value) && !this.isFile(value)) {


            this.objectToFormData(value, fd, arrayKey);
          } else {

            fd.append(arrayKey, value);
          }
        });
      } else {


        fd.append(key, obj[prop]);
      }
    });


    return fd;
  }
}
