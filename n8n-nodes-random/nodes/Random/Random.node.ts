import {
	IExecuteFunctions,
	INodeType,
	INodeTypeDescription,
	NodeConnectionType,
	NodeApiError,
	NodeOperationError,      
} from 'n8n-workflow';

export class Random implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Random', 
		name: 'random',
		icon: { light: 'file:random.svg', dark: 'file:random.dark.svg' },
		group: ['helpers'],
		version: 1,
		description: 'Gera um número aleatório via Random.org API',
		defaults: {
			name: 'Random',
		},
		inputs: [NodeConnectionType.Main],
		outputs: [NodeConnectionType.Main],
		properties: [

			{
				displayName: 'Operação',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				options: [
					{
						name: 'True Random Number Generator', 
						value: 'generate',
						description: 'Gera um número aleatório',
					},
				],
				default: 'generate',
			},

			{
				displayName: 'Min', 
				name: 'min',
				type: 'number',
				default: 1,
				description: 'O valor mínimo (inclusivo)', 
				required: true,
				displayOptions: {
					show: {
						operation: ['generate'],
					},
				},
			},
			{
				displayName: 'Max',
				name: 'max',
				type: 'number',
				default: 100,
				description: 'O valor máximo (inclusivo)',
				required: true,
				displayOptions: {
					show: {
						operation: ['generate'],
					},
				},
			},
		],
	};

	async execute(this: IExecuteFunctions): Promise<any> {

		const items = this.getInputData();
		const returnData = [];

		let options = {
			method: 'GET' as const,
			url: 'https://www.random.org/integers/',
			qs: {
			  num: 1, min: 1, max: 100, col: 1, base: 10, format: 'plain', rnd: 'new',
			},
			responseType: 'text',
			json: false,
		  };

		for (let itemIndex = 0; itemIndex < items.length; itemIndex++) {

			let resp : any;
			let min : number;
			let max : number;

			try{

				min = this.getNodeParameter('min', itemIndex) as number;
				max = this.getNodeParameter('max', itemIndex) as number;

			}catch(err){

				if(this.continueOnFail()){
					returnData.push({ json: items[itemIndex].json, error: new NodeApiError(this.getNode(), err, { itemIndex: itemIndex }) });
					continue
				}

				throw err;
			}

			if(min > max) [min, max] = [max, min];

			options.qs.min = min;
			options.qs.max = max;
	
			try{
				resp = await this.helpers.httpRequest(options);
			}catch(err){

				if(this.continueOnFail()){
					returnData.push({ json: items[itemIndex].json, error: new NodeApiError(this.getNode(), err, { itemIndex: itemIndex }) });
					continue
				}

				throw err;
			}

			const randomNumber = parseInt(resp as string, 0);
			
			if (isNaN(randomNumber)) {

				const error = new NodeOperationError(this.getNode(), 'invalid api response', { itemIndex: itemIndex, description: `given response: ${resp}` });
				if (this.continueOnFail()) {
				  returnData.push({ json: items[itemIndex].json, error });
				  continue;
				}
				throw error;
			}

			returnData.push({
				json: {
				  ...items[itemIndex].json,
				  randomNumber: randomNumber,
				},
			});
		

		}

		return this.prepareOutputData(returnData);
	}
}