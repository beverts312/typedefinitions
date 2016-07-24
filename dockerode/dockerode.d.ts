declare module "dockerode" {
	/**
	 * Used to Interact with Container API
	 * @interface Container
	 */
	interface Container {
		id: string;
		defaultOptions: any;
		/**
		 * Return low-level information on the container 
		 * @param {ContainerInspectOpts} options
		 * @param {(err: Error, data: ContainerInfo) => void} callback
		 */
		inspect(opts: ContainerInspectOpts, callback: (err: Error, data: ContainerInfo) => void);
		/**
		 * Rename the container
		 * @param {RenameOpts} options
		 * @param {(err: Error) => void} callback
		 */
		rename(opts: RenameOpts, callback: (err: Error) => void);
		/**
		 * List processes running inside the container id. On Unix systems this is done by running the ps command. This endpoint is not supported on Windows.
		 * @param {TopOpts} options
		 * @param {(err: Error, data: ContainerProcesses[]) => void} callback
		 */
		top(opts: TopOpts, callback: (err: Error, data: ContainerProcesses[]) => void);
		/**
		 * Inspect changes on container id’s filesystem 
		 * @param {(err: Error, data: ContainerChange[]) => void} callback
		 */
		changes(callback: (err: Error, data: ContainerChange[]) => void);
		/**
		 * Start the container
		 * @param {StartOpts} options
		 * @param {(err: Error) => void} callback
		 */
		start(opts: StartOpts, callback: (err: Error) => void);
		/**
		 * Pause the container 
		 * @param {(err: Error) => void} callback
		 */
		pause(callback: (err: Error) => void);
		/**
		 * Unpause the container
		 * @param {(err: Error) => void} callback
		 */
		unpause(callback: (err: Error) => void);
		/**
		 * Sets up an exec instance in a running container
		 * @param {ExecOpts} opts
		 * @param {(err: Error, data: ExecResult) => void} callback
		 */
		exec(opts: ExecOpts, callback: (err: Error, data: ExecResult) => void);
		/**
		 * Create a new image from a container’s changes
		 * @param {CommitOpts} options
		 * @param {(err: Error, data: ExecResult) => void} callback
		 */
		commit(opts: CommitOpts, callback: (err: Error, data: ExecResult) => void);
		/**
		 * Stop the container
		 * @param {StopOpts} options
		 * @param {(err: Error) => void} callback
		 */
		stop(opts: StopOpts, callback: (err: Error) => void);
		/**
		 * Restart the container
		 * @param {StopOpts} options
		 * @param {(err: Error) => void} callback
		 */
		restart(opts: StopOpts, callback: (err: Error) => void);
		/**
		 * Kill Container
		 * @param {KillOpts} options
		 * @param {(err: Error) => void} callback
		 */
		kill(opts: KillOpts, callback: (err: Error) => void);
		/**
		 * Resizes the tty session used by the exec command id. The unit is number of characters. This API is valid only if tty was specified as part of creating and starting the exec command.
		 * @param {ResizeOpts} options
		 * @param {(err: Error) => void} callback
		 */
		resize(opts: ResizeOpts, callback: (err: Error) => void);
		/**
		 * Attach to the container 
		 * @param {AttachOpts} options
		 * @param {(err: Error, data: any) => void} callback
		 */
		attach(opts: AttachOpts, callback: (err: Error, data: any) => void);
		/**
		 * Block until container id stops, then returns the exit code  
		 * @param {(err: Error, data: WaitRes) => void} callback
		 */
		wait(callback: (err: Error, data: WaitRes) => void);
		/**
		 * Remove the container 
		 * @param {RemoveOpts} options
		 * @param {(err: Error) => void} callback
		 */
		remove(opts: RemoveOpts, callback: (err: Error) => void);
		/**
		 * Get a tar archive of a resource in the filesystem of container
		 * @param {ArchiveOpts} options
		 * @param {(err: Error, data: any) => void} callback
		 */
		getArchive(opts: ArchiveOpts, callback: (err: Error, data: any) => void);
		/**
		 * Upload a tar archive to be extracted to a path in the filesystem of container
		 * @param {PutArchiveOpts} options
		 * @param {(err: Error, data: any) => void} callback
		 */
		putArchive(opts: PutArchiveOpts, callback: (err: Error, data: any) => void);
		/**
		 * Get Container logs
		 * @param {ContainerLogOpts} options
		 * @param {(err: Error, data: any) => void} callback
		 */
		logs(opts: ContainerLogOpts, callback: (err: Error, data: any) => void);
		/**
		 * Get container stats
		 * @param {StatOpts} options
		 * @param {(err: Error, data: any) => void} callback
		 */
		stats(opts: StatOpts, callback: (err: Error, data: any) => void);
	}

	interface Docker {
		constructor(opts?: ConnectionOpts);
		/**
		 * Validate credentials for a registry and get identity token, if available, for accessing the registry without password.
		 * @param {*} AuthOpts
		 * @param {(err: Error, data: AuthRes) => void} callback
		 */
		checkAuth(AuthOpts: any, callback: (err: Error, data: AuthRes) => void);
		getExec(name: string): Exec;
		/** 
		 * Display system-wide information
		 * @param {(err: Error, data: DockerInfo) => void} callback
		 */
		info(callback: (err: Error, data: DockerInfo) => void);
		/**
		 * Show the docker version information
		 * @param {(err: Error, data: VersionInfo) => void} callback
		 */
		version(callback: (err: Error, data: VersionInfo) => void);
		/**
		 * Ping the docker server
		 * @param {(err: Error) => void} callback
		 */
		ping(callback: (err: Error) => void);
		/**
		 * Get container events from docker, either in real time via streaming, or via polling (using since).
		 * Containers: attach, commit, copy, create, destroy, detach, die, exec_create, exec_detach, exec_start, export, kill, oom, pause, rename, resize, restart, start, stop, top, unpause, update
		 * Images: delete, import, load, pull, push, save, tag, untag
		 * Volumes: create, mount, unmount, destroy
		 * Networks: create, connect, disconnect, destroy
		 * Daemon: reload
		 * @param {EventOpts} opts
		 * @param {(err: Error, data: any) => void} callback
		 */
		getEvents(opts: EventOpts, callback: (err: Error, data: any) => void);
		/** 
		 * Wrapper of the docker run command
		 * @param {string} image
		 * @param {string[]} cmd
		 * @param {*} stream
		 * @param {CreateOpts} createOptions
		 * @param {StartOpts} startOptions
		 * @param {(err: Error, data: any) => void} callback
		 */
		run(image: string, cmd: string[], stream: any, createOptions: CreateOpts, startOptions: StartOpts, callback: (err: Error, data: any) => void);
		/**
		 * Initialize a Swarm Cluster
		 * @param {InitOps} options
		 * @param {(err: Error) => void} callback
		 */
		swarmInit(opts: InitOpts, callback: (err: Error) => void);
		swarmJoin(opts: JoinOpts, callback: (err: Error, data: any) => void);
		swarmLeave(callback: (err: Error, data: any) => void);
		swarmUpdate(opts: any, callback: (err: Error, data: any) => void);
		/**
		 * Create a container
		 * @param {CreateOpts} options
		 * @param {(err: Error, data: any) => void} callback
		 */
		createContainer(opts: CreateOpts, callback: (err: Error, data: any) => void);
		getContainer(id: string): Container;
		listContainers(opts: any, callback: (err: Error, data: ContainerInfo[]) => void);
		/**
		 * Create an image either by pulling it from the registry or by importing it 
		 * @param {string} repoTag
		 * @param {PullOpts} opts
		 * @param {(Token | AuthRes)} auth
		 * @param {(err: Error, data: any) => void} callback
		 */
		pull(repoTag: string, opts: PullOpts, auth: Token | AuthRes, callback: (err: Error, data: any) => void);
		/**
		 * Create an image either by pulling it from the registry or by importing it 
		 * @param {PullOpts} opts
		 * @param {(Token | AuthRes)} auth
		 * @param {(err: Error, data: any) => void} callback
		 */
		createImage(opts: PullOpts, auth: Token | AuthRes, callback: (err: Error, data: any) => void);
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
		inspect(callback: (err: Error, data: ServiceInfo) => void);
		remove(callback: (err: Error) => void);
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
		inspect(callback: (err: Error, data: ImageInfo) => void);
		history(callback: (err: Error, data: any) => void);
		get(callback: (err: Error, data: any) => void);
		push(opts: any, callback: (err: Error, data: any) => void);
		tag(opts: any, callback: (err: Error, data: any) => void);
		remove(opts: any, callback: (err: Error) => void);
	}

	interface Network {
		inspect(callback: (err: Error, data: NetworkInfo) => void);
		remove(opts: any, callback: (err: Error) => void);
		connect(opts: any, callback: (err: Error, data: any) => void);
		disconnect(opts: any, callback: (err: Error, data: any) => void);
	}

	interface Volume {
		inspect(callback: (err: Error, data: VolumeInfo) => void);
		remove(opts: any, callback: (err: Error) => void);
	}

	interface ContainerInfo {
		Command: string;
		Created: number;
		HostConfig: HostConfig;
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

	interface DockerInfo {
		Architecture: string;
		ClusterStore: string;
		CgroupDriver: string;
		Containers: number;
		ContainersRunning: number;
		ContainersStopped: number;
		ContainersPaused: number;
		CpuCfsPeriod: boolean;
		CpuCfsQuota: boolean;
		Debug: boolean;
		DockerRootDir: string;
		Driver: string;
		DriverStatus: any;
		ExperimentalBuild: boolean;
		HttpProxy: string;
		HttpsProxy: string;
		ID: string;
		IPv4Forwarding: boolean;
		Images: number;
		IndexServerAddress: string;
		InitPath: string;
		InitSha1: string;
		KernelMemory: boolean;
		KernelVersion: string;
		Labels: string[];
		MemTotal: number;
		MemoryLimit: number;
		NCPU: number;
		NEventsListener: number;
		NFd: number;
		NGoroutines: number;
		Name: string;
		NoProxy: string;
		OomKillDisable: boolean;
		OSType: string;
		OperatingSystem: string;
		Plugins: Plugins;
		RegistryConfig: RegistryConfig;
		SecurityOptions: string[];
		ServerVersion: string;
		SwapLimit: boolean;
		SystemStatus: any;
		SystemTime: string;
	}

	interface Plugins {
		Volume: string[];
		Network: string[];
	}

	interface RegistryConfig {
		IndexConfigs: any;
		InsecureRegistryCIDRs: string[];
	}

	interface VersionInfo {
		Version: string;
		Os: string;
		KernelVersion: string;
		GoVersion: string;
		GitCommit: string;
		Arch: string;
		ApiVersion: string;
		BuildTime: string;
		Experimental: boolean;
	}

	interface ContainerProcesses {
		Titles: string[];
		Processes: string[][];
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

	interface ContainerChange {
		Path: string;

		/**
		 * 0- modify, 1- add, 2- delete 
		 * @type {string}
		 */
		Kind: string;
	}

	interface ExecResult {
		Id: string;
		Warning: string[];
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

	interface AuthRes {
		Status: string;
		IdentityToken: string;
	}

	interface WaitRes {
		StatusCode: string;
	}

	interface DockerEvent {
		status: string;
		id: string;
		Type: string;
		Action: string;
		Actor: Actor;
		time: number;
		timeNano: number;
	}

	interface Actor {
		ID: string;
		Attributes: any;
	}

	interface Token {
		registrytoken: string;
	}

	
	interface HostConfig {
		Binds: string[];
		Links: string[];
		Memory: number;
		MemorySwap: number;
		MemoryReservation: number;
		KernelMemory: number;
		CpuPercent: number;
		CpuShares: number;
		CpuPeriod: number;
		CpuQuota: number;
		CpusetCpus: string;
		CpusetMems: number[];
		MaximumIOps: number;
		MaximumIOBps: number;
		BlkioWeight: number;
		BlkioWeightDevice: BlkioWeightDevice[];
		BlkioDeviceReadBps: BlkioDeviceBps[];
		BlkioDeviceWriteBps: BlkioDeviceBps[];
		BlkioDeviceReadIOps: BlkioDeviceBps[];
		BlkioDeviceWiiteIOps: BlkioDeviceBps[];
		MemorySwappiness: number;
		OomKillDisable: boolean;
		OomScoreAdj: number;
		PidMode: string;
		PidsLimit: number;
		PortBindings: any;
		PublishAllPorts: boolean;
		Privileged: boolean;
		ReadonlyRootfs: boolean;
		Dns: any;
		DnsOptions: any;
		DnsSearch: any;
		ExtraHosts: string[];
		VolumesFrom: string[];
		CapAdd: string[];
		Capdrop: string[];
		GroupAdd: string[];
		RestartPolicy: string;
		UsernsMode: string;
		NetworkMode: string;
		Devices: any;
		Ulimits: Ulimit[];
		Sysctls: any[];
		SecurityOpt: string[];
		StorageOpt: ResizeOpts;
		LogConfig: any;
		CgroupParent: string;
		VolumeDriver: string;
		ShmSize: number;
	}

	interface Ulimit {
		Name: string;
		Soft: number;
		Hard: number;
	}

	interface BlkioWeightDevice {
		Path: string;
		Weight: number;
	}
	
	interface BlkioDeviceBps {
		Path: string;
		Rate: number;		
	}
	
	interface TopOpts {
		/**
		 * ps arguments to use (e.g., aux), defaults to -ef
		 * @type {string}
		 */
		ps_args: string;
	}

	interface RenameOpts {
		/**
		 * new name for the container 
		 * @type {string}
		 */
		name: string;
	}

	interface ContainerInspectOpts {
		/**
		 * return container size information 
		 * @type {boolean}
		 */
		size: boolean;
	}

	interface StartOpts {
		/**
		 * Override the key sequence for detaching a container. Format is a single character [a-Z] or ctrl-<value> where <value> is one of: a-z, @, ^, [, , or _.
		 * @type {string}
		 */
		detachKeys: string;
	}

	interface ExecOpts {
		/**
		 * Boolean value, attaches to stdin of the exec command.
		 * @type {boolean}
		 */
		AttachStdin: boolean;
		/**
		 * Boolean value, attaches to stdout of the exec command.
		 * @type {boolean}
		 */
		AttachStdout: boolean;
		/**
		 * Boolean value, attaches to stderr of the exec command.
		 * @type {boolean}
		 */
		AttachStderr: boolean;
		/**
		 * Override the key sequence for detaching a container. Format is a single character [a-Z] or ctrl-<value> where <value> is one of: a-z, @, ^, [, , or _. 
		 * @type {string}
		 */
		DetachKeys: string;
		/**
		 * Boolean value to allocate a pseudo-TTY.
		 * @type {boolean}
		 */
		Tty: boolean;
		/**
		 * Command to run specified as a string or an array of strings.
		 * @type {(string[] | string)}
		 */
		Cmd: string[] | string;
	}

	interface CommitOpts {
		/**
		 * the container’s configuration
		 * @type {ContainerInfo}
		 */
		config: ContainerInfo;
		/**
		 * repository
		 * @type {string}
		 */
		repo: string;
		/**
		 * tag
		 * @type {string}
		 */
		tag: string;
		/**
		 * commit message
		 * @type {string}
		 */
		comment: string;
		/**
		 * author (e.g., “John Hannibal Smith <hannibal@a-team.com>“)
		 * @type {string}
		 */
		author: string;
		/**
		 * whether to pause the container before committing
		 * @type {boolean}
		 */
		pause: boolean;
		/**
		 * Dockerfile instructions to apply while committing
		 * @type {string[]}
		 */
		changes: string[];
	}

	interface StopOpts {
		/**
		 * number of seconds to wait before killing the container 
		 * @type {number}
		 */
		t: number;
	}

	interface KillOpts {
		/**
		 * Signal to send to the container: integer or string like SIGINT. When not set, SIGKILL is assumed and the call waits for the container to exit.
		 * @type {string}
		 */
		signal: string;
	}

	interface ResizeOpts {
		/**
		 * height of tty session
		 * @type {number}
		 */
		h: number;
		/**
		 * width
		 * @type {number}
		 */
		w: number;
	}

	interface AttachOpts {
		/**
		 * Override the key sequence for detaching a container. Format is a single character [a-Z] or ctrl-<value> where <value> is one of: a-z, @, ^, [, , or _.
		 * @type {string}
		 */
		detachKeys: string;
		/**
		 * return logs. Default false
		 * @type {boolean}
		 */
		logs: boolean;
		/**
		 * return stream. Default false.
		 * @type {boolean}
		 */
		stream: boolean;
		/**
		 * if stream=true, attach to stdin. Default false.
		 * @type {boolean}
		 */
		stdin: boolean;
		/**
		 * if logs=true, return stdout log, if stream=true, attach to stdout. Default false.
		 * @type {boolean}
		 */
		stdout: boolean;
		/**
		 * if logs=true, return stderr log, if stream=true, attach to stderr. Default false.
		 * @type {boolean}
		 */
		stderr: boolean;
	}

	interface RemoveOpts {
		/**
		 * Remove the volumes associated to the container. Default false.
		 * @type {boolean}
		 */
		v: boolean;
		/**
		 * Kill then remove the container. Default false. 
		 * @type {boolean}
		 */
		force: boolean;
	}

	interface ArchiveOpts {
		/**
		 * resource in the container’s filesystem to archive.
		 * @type {string}
		 */
		path: string;
	}

	interface PutArchiveOpts {
		/**
		 * resource in the container’s filesystem to archive.
		 * @type {string}
		 */
		path: string;
		/**
		 * If true then it will be an error if unpacking the given content would cause an existing directory to be replaced with a non-directory and vice versa.
		 * @type {boolean}
		 */
		noOverwriteDirNonDir: boolean;
	}

	interface ContainerLogOpts {
		/**
		 * Show extra details provided to logs. Default false.
		 * @type {boolean}
		 */
		details: boolean;
		/**
		 * return stream. Default false
		 * @type {boolean}
		 */
		follow: boolean;
		/** 
		 * show stdout log. Default false
		 * @type {boolean}
		 */
		stdout: boolean;
		/**
		 * show stderr log. Default false.
		 * @type {boolean}
		 */
		stderr: boolean;
		/**
		 * UNIX timestamp (integer) to filter logs. Specifying a timestamp will only output log-entries since that timestamp. Default: 0 (unfiltered)
		 * @type {number}
		 */
		since: number;
		/**
		 * print timestamps for every log line. Default false.
		 * @type {boolean}
		 */
		timestampes: boolean;
		/**
		 * Output specified number of lines at the end of logs: all or <number>. Default all.
		 * @type {(string | number)}
		 */
		tail: string | number;
	}

	interface StatOpts {
		/**
		 * pull stats once then disconnect. Default true. 
		 * @type {boolean}
		 */
		stream: boolean;
	}

	interface ConnectionOpts {
		socketPath: string;
		host: string;
		port: number;
		ca: any;
		cert: any;
		key: any;
	}

	interface AuthOpts {
		username: string;
		password: string;
		serveraddress: string;
	}

	interface EventOpts {
		/**
		 * Timestamp used for polling		
		 * @type {number}
		 */
		since: number;
		/**
		 * Timestamp used for polling
		 * @type {number}
		 */
		until: number;
		/**
		 * A json encoded value of the filters (a map[string][]string) to process on the event list. 
		 * @type {string}
		 */
		filters: string;
	}

	interface PullOpts {
		fromImage: string;
		fromSrc: string;
		repo: string;
	}

	interface CreateOpts {
		Hostname: string;
		Domainname: string;
		User: string;
		AttachStdin: boolean;
		AttachStderr: boolean;
		AttachStdout: boolean;
		Tty: boolean;
		OpenStdin: boolean;
		StdinOnce: boolean;
		Env: string[];
		Labels: any;
		Cmd: string | string[];
		Entrypoint: string | string[];
		Image: string;
		Volumes: string[];
		WorkingDir: string;
		NetworkDisabled: boolean;
		ExposedPorts: any;
		StopSignal: string | number;
		HostConfig: HostConfig;
	}

	interface InitOpts {
		ListenAddr: string;
  		ForceNewCluster: boolean;
  		Spec: SwarmSpec;
    	Orchestration: Orchestration;
    	Raft: Raft;
    	Dispatcher: Dispatcher;
    	CAConfig: any;
	}
	
	interface SwarmSpec {
    	AcceptancePolicy: AcceptancePolicy;
    }
	
	interface AcceptancePolicy{
		Policies: Policy[];
	}

	interface Policy {
		Role: string;
		Autoaccept: boolean;
		Secret: string;
	}

	interface Orchestration {
		TaskHistoryRetentionLimit: number;
	}

	interface Raft {
		SnapshotInterval: number;
		KeepOldSnapshots: number;
		LogEntriesForSlowFollowers: number;
		HeartbeatTick: number;
		ElectionTick: number;
	}

	interface Dispatcher {
		HeartbeatPeriod: number;
	}

	interface CAConfig {
		NodeCertExpiry: number;
		ExternalCA: ExternalCA;
	}

	interface ExternalCA {
		Protocal: string;
		Url: string;
		Options: any[];
	}

	interface JoinOpts {
		ListenAddr: string;
		RemoteAddr: string;
		Secret: string;
		CACertHash: string;
  		Manager: boolean;
	}
}