declare module "dockerode" {
	interface Container {
		id: string;
		defaultOptions: any;
		inspect(callback: (err: Error, data: any) => void);
		rename(opts: any, callback: (err: Error, data: any) => void);
		top(opts: any, callback: (err: Error, data: any) => void);
		changes(callback: (err: Error, data: any) => void);
		start(opts: any, callback: (err: Error, data: any) => void);
		pause(opts: any, callback: (err: Error, data: any) => void);
		unpause(opts: any, callback: (err: Error, data: any) => void);
		exec(opts: any, callback: (err: Error, data: any) => void);
		commit(opts: any, callback: (err: Error, data: any) => void);
		stop(opts: any, callback: (err: Error, data: any) => void);
		restart(opts: any, callback: (err: Error, data: any) => void);
		kill(opts: any, callback: (err: Error, data: any) => void);
		resize(opts: any, callback: (err: Error, data: any) => void);
		attach(opts: any, callback: (err: Error, data: any) => void);
		wait(opts: any, callback: (err: Error, data: any) => void);
		remove(opts: any, callback: (err: Error, data: any) => void);
		getArchive(opts: any, callback: (err: Error, data: any) => void);
		infoArchive(opts: any, callback: (err: Error, data: any) => void);
		putArchive(opts: any, callback: (err: Error, data: any) => void);
		logs(opts: any, callback: (err: Error, data: any) => void);
		stats(opts: any, callback: (err: Error, data: any) => void);
	}

	interface Docker {
		constructor(opts: any);
		
		checkAuth(opts: any, callback: (err: Error, data: any) => void);
		getExec(name: string): Exec;
		info(callback: (err: Error, data: any) => void);
		version(callback: (err: Error, data: any) => void);
		ping(callback: (err: Error, data: any) => void);
		getEvents(opts: any, callback: (err: Error, data: any) => void);
		pull(repoTag: string, opts: any, auth: any, callback: (err: Error, data: any) => void);
		run(image: string, cmd: string[], stream: any, createOptions: any, startOptions: any, callback: (err: Error, data: any) => void);

		swarmInit(opts: any, callback: (err: Error, data: any) => void);
		swarmJoin(opts: any, callback: (err: Error, data: any) => void);
		swarmLeave(callback: (err: Error, data: any) => void);
		swarmUpdate(opts: any, callback: (err: Error, data: any) => void);

		createContainer(opts: any, callback: (err: Error, data: any) => void);
		getContainer(id: string): Container;
		listContainers(opts: any, callback: (err: Error, data: ContainerInfo[]) => void);
		
		createImage(opts: any, auth: any, callback: (err: Error, data: any) => void);
		getImage(name: string): Image;
		listImages(opts: any, callback: (err: Error, data: ImageInfo[]) => void);
		buildImage(file: string, opts: any, callback: (err: Error, data: any) => void);
		loadImage(file: string, opts: any, callback: (err: Error, data: any) => void);
		searchImages(opts: any, callback: (err: Error, data: any) => void);
		
		createService(opts: any, auth: any, callback: (err: Error, data: any) => void);
		getService(id: string): Service;
		listServices(callback: (err: Error, data: ServiceInfo[]) => void);

		getNode(id: string): Node;
		listNodes(callback: (err: Error, data: NodeInfo[]) => void);

		getTask(id: string): Task;
		listTasks(callback: (err: Error, data: any) => void);

		createVolume(opts: any, callback: (err: Error, data: any) => void);
		getVolume(name: string): Volume;
		listVolumes(opts: any, callback: (err: Error, data: VolumeInfo[]) => void);

		createNetwork(opts: any, callback: (err: Error, data: any) => void);
		getNetwork(name: string): Network;
		listNetworks(opts: any, callback: (err: Error, data: NetworkInfo[]) => void);
	}

	interface Service {
		inspect(callback: (err: Error, data: any) => void);
		remove(callback: (err: Error, data: any) => void);
		update(opts: any, callback: (err: Error, data: any) => void);
	}

	interface Task {
		inspect(callback: (err: Error, data: TaskInfo[]) => void);
	}

	interface Node {
		inspect(callback: (err: Error, data: NodeInfo[]) => void);
	}

	interface Exec {
		id: string;
		start(opts: any, callback: (err: Error, data: any) => void);
		resize(opts: any, callback: (err: Error, data: any) => void);
		inspect(callback: (err: Error, data: any) => void);
	}

	interface Image {
		name: string;
		inspect(callback: (err: Error, data: any) => void);
		history(callback: (err: Error, data: any) => void);
		get(callback: (err: Error, data: any) => void);
		push(opts: any, callback: (err: Error, data: any) => void);
		tag(opts: any, callback: (err: Error, data: any) => void);
		remove(opts: any, callback: (err: Error, data: any) => void);
	}

	interface Network {
		inspect(callback: (err: Error, data: any) => void);
		remove(opts: any, callback: (err: Error, data: any) => void);
		connect(opts: any, callback: (err: Error, data: any) => void);
		disconnect(opts: any, callback: (err: Error, data: any) => void);
	}

	interface Volume {
		inspect(callback: (err: Error, data: any) => void);
		remove(opts: any, callback: (err: Error, data: any) => void);
	}

	interface ContainerInfo {
		Command: string;
		Created: number;
		HostConfig: any;
		Id: string;
		Image: string;
		ImageID: string;
		Labels: any;
		Mounts: any[];
		Names: string[];
		NetworkSettings: any;
		Ports: any[]
		State: string;
		Status: string;
	}

	interface ImageInfo {
		Created: number;
		Id: string;
		Labels: any;
		ParentId: string;
		RepoDigests: any[];
		RepoTags: any[];
		Size: number;
		VirualSize: number;
	}

	interface VolumeInfo {

	}

	interface NetworkInfo {

	}

	interface NodeInfo {
		CraetedAt: string;
		Description: NodeDescription;
		ID: string;
		ManagerStatus: ManagerStatus;
		Spec: NodeSpec;
		Status: NodeStatus;
		UpdatedAt: string;
	}

	interface NodeDescription {
		Hostname: string;		
		Engine: EngineInfo;
		Platform: PlatformInfo;
		Resources: ResourceInfo;
	}

	interface EngineInfo {
		EngineVersion: string;
		Plugins: PluginInfo[];
	}

	interface PlatformInfo {
		Architecture: string;
		OS: string;
	}

	interface ResourceInfo {
		MemoryBytes: number;
		NanoCPUs: number;
	}

	interface PluginInfo {
		Name: string;
		Type: string;
	}

	interface ManagerStatus {
		Addr: string;
		Reachability: string;
	}

	interface NodeSpec {
		Availability: string;
		Membership: string;
		Role: string;
	}

	interface NodeStatus {
		State: string;
	}

	interface ServiceInfo {
		CreatedAt: string;
		Endpoint: EndpointInfo;
		ID: string;
		Spec: ServiceSpec;
		UpdatedAt: string;
	}

	interface EndpointInfo {
		Ports: PortInfo[];
		Spec: EndpointSpec;
		VirtualIPs: VirtualIP[]
	}

	interface VirtualIP {
		Addr: string;
		NetworkID: string;
	}

	interface EndpointSpec {
		Mode: string;
		Ports: PortInfo[];
	}

	interface PortInfo {
		Protocal: string;
		PublishedPort: number;
		TargetPort: number;
	}

	interface ServiceSpec {
		Mode: ModeInfo;
		EndpointSpec: EndpointSpec;
		Name: string;
		TaskTemplate: TaskTemplate;
	}

	interface TaskTemplate {
		ContainerSpec: ContainerSpec;
		RestartPolicy: RestartPolicy;
	}

	interface ContainerSpec {
		Env: string[];
		Image: string;
		Mounts: MountInfo;
	}

	interface RestartPolicy {
		Condition: string;
		MaxAttempts: number;
	}

	interface ModeInfo {
		Replicas: number;
	}

	interface MountInfo {
		Source: string;
		Target: string;
		Type: string;
	}

	interface TaskInfo {
		
	}
}
