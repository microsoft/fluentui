A TagGroup is a container that coordinates dismissal and selection across one or more `Tag` children.

The headless `TagGroup` ships without keyboard navigation - it does not include Tabster's arrow-key group or post-dismiss focus restoration. Consumers wire those behaviours up themselves with a focus-management strategy that fits their application (Tabster, a virtual focus manager, etc.).
