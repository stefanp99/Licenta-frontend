import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'jsonTable'
})
export class ConfigValuesTablePipe implements PipeTransform {
    transform(jsonString: string): any[] {
        try {
            const data = JSON.parse(jsonString);
            const rows = Object.keys(data).map((key) => ({
                key,
                value: data[key]
            }));
            return rows;
        } catch (e) {
            console.error('Failed to parse JSON string', e);
            return [];
        }
    }
}
