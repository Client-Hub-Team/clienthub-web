import { Pipe, PipeTransform } from '@angular/core';


@Pipe({ name: 'resourceSearch' })
export class ResourceSearchPipe implements PipeTransform {
  transform(allResources: any[], value) {
    if (value !== '') {
        return allResources.filter(resource => {
            return (
                resource.name.toLowerCase().search(value.toLowerCase()) !== -1 ||
                resource.description.toLowerCase().search(value.toLowerCase()) !== -1
            );
        });
    } else {
        return allResources;
    }
  }
}
