type Nav = {
	navigate: (value: string, objectValue?: any) => void;
	goBack: any;
	getParam: (valueOne?: string, valueTwo?: string) => void;
};

export { Nav };
