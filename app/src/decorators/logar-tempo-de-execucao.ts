export function logarTempoDeExecucao(emSegundos: boolean = false){
    return function(
        target: any,
        propertyKey: string,
        descriptor: PropertyDescriptor
    ){
        const metodoOriginal = descriptor.value;
        descriptor.value = function(...args: any[]) {
            let divisor = emSegundos ? 1000: 1;
            let unidade = emSegundos ? 'segundos' : 'milisegundos';

            const t1 = performance.now();
            const retorno = metodoOriginal.apply(this, args);
            const t2 = performance.now();
            console.log(`${propertyKey}, Tempo de execução: ${(t2-t1)/divisor} ${unidade}`);
            return retorno;
        };

        return descriptor;
    }
}